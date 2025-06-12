import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { loadFromStorage } from '../utils/storageUtils';

const initialFavorites: Product[] = loadFromStorage<Product>('favorites');

const initialCard: Product[] = loadFromStorage<Product>('card');

const initialState = {
  favoritesItems: initialFavorites,
  cardItems: initialCard,
};

const productSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<Product>) => {
      const index = state.favoritesItems.findIndex(
        item => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.favoritesItems = state.favoritesItems.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.favoritesItems.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favoritesItems));
    },

    addToCard: (state, action: PayloadAction<Product>) => {
      state.cardItems.push(action.payload);
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },

    deleteFromCard: (state, action: PayloadAction<number>) => {
      state.cardItems = state.cardItems.filter(
        item => item.id !== action.payload,
      );
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },
  },
});

export const { toggleFavorites, addToCard, deleteFromCard } =
  productSlice.actions;
export default productSlice.reducer;
