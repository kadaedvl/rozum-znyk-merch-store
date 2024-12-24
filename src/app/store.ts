import { configureStore } from '@reduxjs/toolkit'
import filtreReducer from '../features/counter/filtreSlice'
import basketReducer from '../features/counter/basket'
import productsReducer from '../features/counter/products'
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