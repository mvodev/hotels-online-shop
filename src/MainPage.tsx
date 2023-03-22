import Footer from './components/footer/Footer';
import './MainPage.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <h1 className='main-page__header'>Тестовое задание HOTELS.RU интернет магазин</h1>
      <Footer callbackRef='mock-address-change-me'/>
    </section>
  )
}

export default MainPage;
