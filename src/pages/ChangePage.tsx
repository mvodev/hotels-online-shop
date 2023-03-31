import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/button/Button";
import { CardTypeProps } from "../components/card/Card";
import goodsData from "../model/goodsData";
import './ChangePage.scss';

type Inputs = {
  title: string,
  description: string,
  fullDescription: string,
  quantity: string,
  price: string,
};

const ChangePage = () => {
  const params = useParams();
  const barcodeOfProduct = params.id ?? '';
  const productData:CardTypeProps|undefined = goodsData.find(product=>product.barcode === barcodeOfProduct);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const handleDelete = () => {
    const index = goodsData.findIndex(elem=>elem.barcode===barcodeOfProduct);
    if (index>-1) {
      goodsData.splice(index,1);
    }
    navigate('/admin');
  }

  return (
    <main className="change-page">
      <h1 className="change-page__header">Измените данные</h1>
      <div className="change-page__form-wrapper">
        <form className="change-page__form" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <span className="change-page__description">Штрихкод: {productData?.barcode}</span>
        <span className="change-page__description">Название товара:</span>
        <input 
          className="change-page__input" 
          defaultValue={productData?.title} 
          title={'Название товара'}
          {...register("title",{ required: true })} 
        />
        { errors.title && <span className="change-page__error">Обязательное поле</span> }
        {/* include validation with required or other standard HTML validation rules */}
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
        <input className="button button_common" type="submit" value={'Изменить'}/>
      </form>
      <Button buttonType='delete' onPointerDown={handleDelete}/>
      </div>
    </main>
  )
}

export default ChangePage;