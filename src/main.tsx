import { createRoot } from 'react-dom/client'
import { Routes, Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Basket from './components/Pages/Basket/Basket';
import App from './App'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import OneItemPage from './components/Pages/Basket/OneItemPage';
import MainLayout from './layouts/MainLayout';

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path="" element={<App />} />
            <Route path="basket/" element={<Basket />} />
            <Route path="product/:id" element={<OneItemPage />} />
            <Route path="*" element={<h1>Нічого не знайдено</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

