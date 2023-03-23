import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './MainPage.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <Header mapUrl='mock-address-change-me'/>
      <Footer callbackRef='mock-address-change-me'/>
    </section>
  )
}

export default MainPage;
