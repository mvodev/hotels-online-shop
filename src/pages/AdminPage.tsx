import { useState } from 'react';
import AdminCard from '../components/admin-card/AdminCard';
import Header from '../components/header/Header';
import goodsData from '../model/goodsData';
import ls from '../storage/LocalStorage';
import './AdminPage.scss';

const AdminPage = () => {
  const [ productData, setProductData ] = useState(goodsData);
  // const [cards,setCards] = useState([]);
  const cards = goodsData.map((product) => {
    return <AdminCard {...product} key={product.barcode}/>
  });

  console.log(ls.getItems());

  return (
    <>
      <Header withCart={false} searchHandler={()=>{
        console.log('add search handler for header component!!!')
      }} callbackRef={''}/>
      <main className="admin">
        <h1 className='admin__header'>Страница администратора</h1>
        <h2 className='admin__sub-header'>Кликните для изменения информации</h2>
        <div className="admin__cards">
          {cards}
        </div>
      </main>
    </>
  )
}

export default AdminPage;