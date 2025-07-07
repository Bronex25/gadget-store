import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { fetchFromSupabase } from '../utils/api';
type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  products: [] as Product[],
  status: 'idle' as Status,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data: Product[] = await fetchFromSupabase('products');

    return data;
  },
);

const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
