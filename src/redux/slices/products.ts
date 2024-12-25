import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type fetchProductsPropsType = {
    category: string;
    order: string;
    sortValue: string;
    search: string;
    currentPage: number;
}
export const fetchProducts = createAsyncThunk<ItemType[], fetchProductsPropsType>(
    'products/fetchProducts',
    async (params) => {
        const {
            category,
            order,
            sortValue,
            search,
            currentPage } = params;

        const { data } = await axios.get<ItemType[]>(`https://6751caa4d1983b9597b45cbe.mockapi.io/RZShopBase?page=${currentPage}&${category}&sortby=${sortValue}&order=${order}${search}`)
        return data;
    },
)

export type ItemType = {
    id: string;
    name: string;
    description: string;
    images: string;
    price: number;
    count: number;
    rating?: number;
    sizes?: string[];
    stock?: number
}
export interface ProductsSliceType {
    items: ItemType[];
    status: 'loading' | 'save' | 'error';
}


const initialState: ProductsSliceType = {
    items: [],
    status: 'loading',
}

export enum Status {
    LOADING = 'loading',
    SAVE = 'save',
    ERROR = 'error',
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        }).addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
            state.status = Status.SAVE;
            state.items = action.payload;
        }).addCase(fetchProducts.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    },
});

export const { setItems } = productsSlice.actions;

export const productsSeletor = (state: RootState) => state.products

export default productsSlice.reducer;