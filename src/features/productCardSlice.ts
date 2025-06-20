import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../utils/storageUtils';

const initialFavorites: string[] = loadFromStorage<string>('favorites');

const initialCard: string[] = loadFromStorage<string>('card');

const initialState = {
  favoritesItems: initialFavorites,
  cardItems: initialCard,
};

const productSlice = createSlice({
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

    addToCard: (state, action: PayloadAction<string>) => {
      state.cardItems.push(action.payload);
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },

    deleteFromCard: (state, action: PayloadAction<string>) => {
      state.cardItems = state.cardItems.filter(item => item !== action.payload);
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },
  },
});

export const { toggleFavorites, addToCard, deleteFromCard } =
  productSlice.actions;
export default productSlice.reducer;
