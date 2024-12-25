import { configureStore } from '@reduxjs/toolkit'
import filtreReducer from './slices/filtreSlice'
import basketReducer from './slices/basket'
import productsReducer from './slices/products'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filter: filtreReducer,
        basket: basketReducer,
        products: productsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;