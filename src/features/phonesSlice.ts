import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const initialState = {
  phones: [] as Product[],
};

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    sortBy: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'alph':
          state.phones.sort((p1, p2) => p1.name.localeCompare(p2.name));

        case 'newest':
          state.phones.sort((p1, p2) => p1.year - p2.year);

        case 'cheapest':
          state.phones.sort((p1, p2) => p1.price - p2.price);
      }
    },
  },
});

export const {} = phonesSlice.actions;
export default phonesSlice.reducer;
