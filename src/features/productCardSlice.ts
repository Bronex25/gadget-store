import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../utils/storageUtils';

const initialFavorites: string[] = loadFromStorage<string>('favorites');

const initialCard: CardItem[] = loadFromStorage<CardItem>('card');

export type CardItem = {
  itemId: string;
  quantity: number;
};

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

    addToCard: (state, action: PayloadAction<CardItem>) => {
      const itemInCard = state.cardItems.find(
        item => item.itemId === action.payload.itemId,
      );
      if (itemInCard) {
        itemInCard.quantity += action.payload.quantity;
      } else {
        state.cardItems.push(action.payload);
      }
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cardItems = state.cardItems.filter(
        item => item.itemId !== action.payload,
      );
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },

    reduceQuantity: (state, action: PayloadAction<string>) => {
      const itemInCard = state.cardItems.find(
        item => item.itemId === action.payload,
      );
      if (itemInCard && itemInCard.quantity > 1) {
        itemInCard.quantity -= 1;
      }
      localStorage.setItem('card', JSON.stringify(state.cardItems));
    },
  },
});

export const { toggleFavorites, addToCard, deleteFromCart, reduceQuantity } =
  productSlice.actions;
export default productSlice.reducer;
