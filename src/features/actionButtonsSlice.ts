import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../utils/storageUtils';

const initialFavorites: string[] = loadFromStorage<string>('favorites');

const initialCart: CartItem[] = loadFromStorage<CartItem>('cart');

export type CartItem = {
  itemId: string;
  quantity: number;
};

const initialState = {
  favoritesItems: initialFavorites,
  cartItems: initialCart,
};

const actionButtonsSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const index = state.favoritesItems.findIndex(
        item => item === action.payload,
      );

      if (index !== -1) {
        state.favoritesItems = state.favoritesItems.filter(
          item => item !== action.payload,
        );
      } else {
        state.favoritesItems.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favoritesItems));
    },

    addToCard: (state, action: PayloadAction<CartItem>) => {
      const itemInCard = state.cartItems.find(
        item => item.itemId === action.payload.itemId,
      );
      if (itemInCard) {
        itemInCard.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.itemId !== action.payload,
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    reduceQuantity: (state, action: PayloadAction<string>) => {
      const itemInCard = state.cartItems.find(
        item => item.itemId === action.payload,
      );
      if (itemInCard && itemInCard.quantity > 1) {
        itemInCard.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
});

export const { toggleFavorites, addToCard, deleteFromCart, reduceQuantity } =
  actionButtonsSlice.actions;
export default actionButtonsSlice.reducer;
