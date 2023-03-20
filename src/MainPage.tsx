import Logo from './components/logo/Logo';
import './MainPage.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <h1 className='main-page__header'>Тестовое задание HOTELS.RU интернет магазин</h1>
      <Logo mode='dark'/>
      <Logo mode='white'/>
    </section>
  )
}

export default MainPage;
