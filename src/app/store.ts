import { configureStore } from '@reduxjs/toolkit';
import productCardSlice from '../features/productCardSlice';
import productsSlice from '../features/productsSlice';
export const store = configureStore({
  reducer: {
    productCard: productCardSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
