import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import './ConfirmPage.scss';

const ConfirmPage = () => {
  return (
    <main className="confirm">
      <BreadCrumbs links={[
        {link:'/',name:'Главная'},
        {link: '',name:`${'Оформление заказа'}`,actual:true},
      ]}/>
      <h1 className="confirm__header">Заказ оформлен</h1>
    </main>
  )
}

export default ConfirmPage;