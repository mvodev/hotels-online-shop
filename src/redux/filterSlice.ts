import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface FilterState {
  filters: string[];
}

const initialState: FilterState = {
  filters: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilters: (state,action: PayloadAction<string>) => {
      const indexOfFilter = state.filters.indexOf(action.payload);
      if (indexOfFilter>-1) {
        state.filters.splice(indexOfFilter,1);
      } else state.filters.push(action.payload);
    },
  },
});

export const { addFilters } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter.filters;

export default filterSlice.reducer;
