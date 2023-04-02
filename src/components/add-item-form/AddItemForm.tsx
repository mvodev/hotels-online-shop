import { useForm } from "react-hook-form";
import { CardTypeProps } from "../card/Card";
import './AddItemForm.scss';

type Inputs = CardTypeProps;

type AddItemFormTypeProps = {
  productData:CardTypeProps|undefined,
  typeOfForm?:'new'
  onSubmit:(data:CardTypeProps) => void
}

const AddItemForm = (props:AddItemFormTypeProps) => {
  const {productData,typeOfForm,onSubmit} = props;
  const buttonSubmitTitle = typeOfForm === undefined ? 'Изменить' : 'Добавить';
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  return (
    <form className="add-item-form" onSubmit={handleSubmit(onSubmit)}>
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
      <span className="change-page__description">Производитель:</span>
      <input 
        className="change-page__input"
        title={'Производитель'}
        defaultValue={productData?.manufacturer}
        {...register("manufacturer", { required: true })} />
      { errors.price && <span className="change-page__error">Обязательное поле</span> }
      <input 
        className="button button_common" 
        type="submit" 
        value={buttonSubmitTitle}/>
    </form>
  )

}

export default AddItemForm;