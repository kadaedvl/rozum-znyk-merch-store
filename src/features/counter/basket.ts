import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ItemType } from './products';

interface IBasketSlice {
    items: ItemType[];
    totalPrice: number;
    totalAmount: number;
}
const initialState: IBasketSlice = {
    items: [],
    totalPrice: 0,
    totalAmount: 0,
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ItemType>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => { return (obj.price * obj.count) + sum }, 0);
            state.totalAmount = state.items.reduce((sum, obj) => { return sum + obj.count }, 0);
        },
        removeAllProduts: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalAmount = 0;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => { return (obj.price * obj.count) + sum }, 0);
            state.totalAmount = state.items.reduce((sum, obj) => { return sum + obj.count }, 0);
        },
        minusCountOneItem: (state, action: PayloadAction<string>) => {
            const decObject = state.items.find((obj) => obj.id === action.payload)
            if (decObject) {
                decObject.count--;
            }
            state.totalPrice = state.items.reduce((sum, obj) => { return (obj.price * obj.count) + sum }, 0);
            state.totalAmount = state.items.reduce((sum, obj) => { return sum + obj.count }, 0);
        }
    },
});

export const { addProduct, removeAllProduts, removeItem, minusCountOneItem } = basketSlice.actions;

export const basketSelector = (state: RootState) => state.basket;

export default basketSlice.reducer;