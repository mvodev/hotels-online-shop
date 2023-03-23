import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './MainPage';
import 'normalize.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <h1>Тестовое задание HOTELS.RU интернет магазин</h1>
    <MainPage />
  </React.StrictMode>,
)
