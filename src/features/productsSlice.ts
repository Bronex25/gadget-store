import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getItems } from '../utils/api';

const initialState = {
  products: [] as Product[],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data: Product[] = await getItems('products');

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
