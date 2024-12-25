import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import MainLayout from './layouts/MainLayout';
import Loading from './components/Loading/Loading';
import './index.css'

const Basket = lazy(() => import('./Pages/Basket/Basket'))
const ProductDetailsPage = lazy(() => import('./Pages/ProductDetailsPage/ProductDetailsPage'))
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'))

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path="" element={<App />} />
            <Route path="basket/" element={<Suspense fallback={<Loading />}><Basket /></Suspense>} />
            <Route path="product/:id" element={<Suspense fallback={<Loading />}><ProductDetailsPage /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}