import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import 'normalize.css';
import './index.scss';
import {store} from './redux/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/cards/:id' element={<ProductPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/admin' element={<AdminPage/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
