import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/admin-card/AdminCard';
import Button from '../components/button/Button';
import Header from '../components/header/Header';
import goodsData from '../model/goodsData';
import ls from '../storage/LocalStorage';
import './AdminPage.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  const cards = goodsData.map((product) => {
    return <AdminCard {...product} key={product.barcode}/>
  });

  const handleAdd = () => {
    console.log('handle add');
    navigate('/admin/add');
  }

  return (
    <>
      <Header withCart={false} searchHandler={()=>{
        console.log('add search handler for header component!!!')
      }} callbackRef={''}/>
      <main className="admin">
        <h1 className='admin__header'>Страница администратора</h1>
        <h2 className='admin__sub-header'>Кликните по карточке товара для изменения или удаления информации или нажмите кнопку добавить для внесения новой</h2>
        <Button buttonType='add' onPointerDown={handleAdd}/>
        <div className="admin__cards">
          {cards}
        </div>
      </main>
    </>
  )
}

export default AdminPage;