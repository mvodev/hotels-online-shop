import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddItemForm from "../components/add-item-form/AddItemForm";
import BreadCrumbs from "../components/bread-crumbs/BreadCrumbs";
import Button from "../components/button/Button";
import { CardTypeProps } from "../components/card/Card";
import Header from "../components/header/Header";
import ls from "../storage/LocalStorage";
import './ChangePage.scss';

export type ChangePagePropsType = {
  typeOfCard?:'new'
}

type Inputs = CardTypeProps;

const ChangePage = (props:ChangePagePropsType) => {
  const { typeOfCard } = props;
  const dataInStorage = ls.getItems() ?? [];
  const pageTitle = typeOfCard === 'new' ? 'Введите данные': 'Измените данные';
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
  } else productData = dataInStorage.find(product=>product.barcode === barcodeOfProduct);

  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    if (typeOfCard === 'new') {
      ls.addItem(data);
    } else {
      ls.replaceItem(data);
    }
    navigate('/admin');
  }

  const handleDelete = () => {
    ls.deleteItem(barcodeOfProduct);
    navigate('/admin');
  }

  return (
    <div className="wrapper">
      <Header withCart={false} searchHandler={()=>{
        console.log('add search handler for header component!!!')
      }} callbackRef={''}/>
      <main className="change-page">
        <BreadCrumbs links={[
            {link:'/',name:'Главная'},
            {link: '/admin',name:'Страница администратора'},
            {link: '/admin/add',name:`${pageTitle}`,actual:true},
          ]}/>
        <h1 className="change-page__header">{pageTitle}</h1>
        <div className="change-page__form-wrapper">
        <AddItemForm onSubmit={handleSubmit} typeOfForm={typeOfCard} productData={productData}/>
        <Button buttonType='delete' onPointerDown={handleDelete}/>
        </div>
      </main>
    </div>
  )
}

export default ChangePage;