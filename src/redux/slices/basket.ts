import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ItemType } from '../../redux/slices/products';
import { getProductFromLS } from '../../utils/getProductFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotamAmount } from '../../utils/calcTotamAmount';

interface IBasketSlice {
    items: ItemType[];
    totalPrice: number;
    totalAmount: number;
}
const { items, totalPrice, totalAmount } = getProductFromLS()

const initialState: IBasketSlice = {
    items,
    totalPrice,
    totalAmount
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
            state.totalPrice = calcTotalPrice(state.items)
            state.totalAmount = calcTotamAmount(state.items);
        },
        removeAllProduts: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalAmount = 0;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items)
            state.totalAmount = calcTotamAmount(state.items);
        },
        minusCountOneItem: (state, action: PayloadAction<string>) => {
            const decObject = state.items.find((obj) => obj.id === action.payload)
            if (decObject) {
                decObject.count--;
            }
            state.totalPrice = calcTotalPrice(state.items)
            state.totalAmount = calcTotamAmount(state.items);
        }
    },
});

export const { addProduct, removeAllProduts, removeItem, minusCountOneItem } = basketSlice.actions;

export const basketSelector = (state: RootState) => state.basket;

export default basketSlice.reducer;