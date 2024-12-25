import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type FiltreSliceType = {
    sortType: string;
    categories: string;
    searchValue: string;
    currentPage: number;
}
const initialState: FiltreSliceType = {
    sortType: 'price',
    categories: 'all',
    searchValue: '',
    currentPage: 1,
}

export const filtreSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSortType: (state, action: PayloadAction<string>) => {
            state.sortType = action.payload;
        },
        setCategories: (state, action: PayloadAction<string>) => {
            state.categories = action.payload;
            state.currentPage = 1;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FiltreSliceType>) {
            state.categories = action.payload.categories;
            state.currentPage = action.payload.currentPage;
            state.sortType = action.payload.sortType;
        }
    },
});

export const { setSortType, setCategories, setSearchValue, setCurrentPage, setFilters } = filtreSlice.actions;

export const filterSelector = (state: RootState) => state.filter
export default filtreSlice.reducer;