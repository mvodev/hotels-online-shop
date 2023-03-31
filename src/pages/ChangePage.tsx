import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/button/Button";
import { CardTypeProps } from "../components/card/Card";
import goodsData from "../model/goodsData";
import './ChangePage.scss';

type Inputs = CardTypeProps;

export type ChangePagePropsType = {
  typeOfCard?:'new'
}

const ChangePage = (props:ChangePagePropsType) => {
  const { typeOfCard } = props;
  const pageTitle = typeOfCard === 'new' ? 'Введите данные': 'Измените данные';
  const buttonSubmitTitle = typeOfCard === undefined ? 'Изменить' : 'Добавить';
  const params = useParams();
  const barcodeOfProduct = params.id ?? '';
  let productData: CardTypeProps | undefined = undefined;
  if (typeOfCard && typeOfCard === 'new') {
    productData = {
      imgUrl:'',
      title:'',
      description:'',
      quantity: '',
      quantityImg: '',
      barcode: '',
      manufacturer: '',
      brand: '',
      price: '',
      typeOfCare: '',
      fullDescription: '',
    }
  } else productData = goodsData.find(product=>product.barcode === barcodeOfProduct);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    goodsData.push(data);
    navigate('/admin');
  }

  const handleDelete = () => {
    const index = goodsData.findIndex(elem => elem.barcode === barcodeOfProduct);
    if (index>-1) {
      goodsData.splice(index,1);
    }
    navigate('/admin');
  }

  return (
    <main className="change-page">
      <h1 className="change-page__header">{pageTitle}</h1>
      <div className="change-page__form-wrapper">
        <form className="change-page__form" onSubmit={handleSubmit(onSubmit)}>
        <span className="change-page__description">Название товара:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.title} 
          title={'Название товара'}
          {...register("title",{ required: true })} 
        />
        { errors.title && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Описание товара:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.description}
          title={'Описание товара'}
          {...register("description", { required: true })} />
        { errors.description && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Полное описание товара:</span>
        <textarea 
          className="change-page__input"
          title={'Полное описание товара'}
          defaultValue={productData?.fullDescription}
          {...register("fullDescription", { required: true })} />
        { errors.fullDescription && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Цена:</span>
        <input 
          className="change-page__input"
          title={'Цена'}
          defaultValue={productData?.price}
          {...register("price", { required: true })} />
        { errors.price && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Размерность упаковки:</span>
        <input 
          className="change-page__input"
          title={'Размерность упаковки'}
          defaultValue={productData?.quantity}
          {...register("quantity", { required: true })} />
        { errors.quantity && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">URL картинки:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.imgUrl}
          title={'URL картинки'}
          {...register("imgUrl", { required: true })} />
        { errors.imgUrl && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Штрихкод:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.barcode}
          title={'Штрихкод'}
          {...register("barcode", { required: true })} />
        { errors.barcode && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Тип ухода,если несколько, то через запятую:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.typeOfCare}
          title={'Тип ухода'}
          {...register("typeOfCare", { required: true })} />
        { errors.typeOfCare && <span className="change-page__error">Обязательное поле</span> }
        <span className="change-page__description">Бренд:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.brand}
          title={'Бренд'}
          {...register("brand", { required: true })} />
        { errors.brand && <span className="change-page__error">Обязательное поле</span> }
        <input 
          className="button button_common" 
          type="submit" 
          value={buttonSubmitTitle}/>
      </form>
      <Button buttonType='delete' onPointerDown={handleDelete}/>
      </div>
    </main>
  )
}

export default ChangePage;