import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartState {
  cart: Map<string,number>,
}

const initialState: CartState = {
  cart: new Map()
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action: PayloadAction<{barcode:string,quantity:number}>) => {
      if (state.cart.has(action.payload.barcode)) {
        const value = state.cart.get(action.payload.barcode);
        if (value) state.cart.set(action.payload.barcode,value);
      } else state.cart.set(action.payload.barcode,action.payload.quantity)
    },
    removeFromCart: (state,action: PayloadAction<{barcode:string,quantity:number}>)=> {
      if (state.cart.has(action.payload.barcode)) {
        const value = state.cart.get(action.payload.barcode);
        if (value && value >1) state.cart.set(action.payload.barcode,value-1);
      } else state.cart.delete(action.payload.barcode);
    }
  },
});

export const { addToCart,removeFromCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
