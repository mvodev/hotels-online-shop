import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import 'normalize.css';
import './index.scss';
import {store} from './redux/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cards from './pages/Cards';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <h1>Тестовое задание HOTELS.RU интернет магазин</h1>
        {/* <MainPage /> */}
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/cards/:cardsId' element={<Cards/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
