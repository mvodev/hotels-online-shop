import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/admin-card/AdminCard';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import Button from '../components/button/Button';
import Header from '../components/header/Header';
import ls from '../storage/LocalStorage';
import './AdminPage.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  const dataInStorage = ls.getItems() ?? [];
  const cards = dataInStorage.map((product) => {
    return <AdminCard {...product} key={product.barcode}/>
  });

  const handleAdd = () => {
    navigate('/admin/add');
  }

  return (
    <div className="wrapper">
      <Header withCart={false} searchHandler={()=>{
        console.log('add search handler for header component!!!')
      }} callbackRef={''}/>
      <main className="admin">
        <BreadCrumbs links={[
          {link:'/',name:'Главная'},
          {link: '/',name:'Страница администратора',actual:true}
        ]}/>
        <h1 className='admin__header'>Страница администратора</h1>
        <h2 className='admin__sub-header'>Кликните по карточке товара для изменения или удаления информации или нажмите кнопку добавить для внесения новой</h2>
        <Button buttonType='add' onPointerDown={handleAdd}/>
        <div className="admin__cards">
          {cards}
        </div>
      </main>
    </div>
  )
}

export default AdminPage;