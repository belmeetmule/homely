import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://homely-backend.onrender.com';

export const createHouse = createAsyncThunk('houses/create', async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/v1/houses`, { house: formData });
  return response.data;
});

export const deleteHouse = createAsyncThunk(
  'houses/deleteHouse',
  async (houseId) => {
    const response = await axios.delete(`${BASE_URL}api/v1/houses/${houseId}`);
    return response.data;
  },
);

const addHouseSlice = createSlice({
  name: 'houses',
  initialState: {
    houses: [],
    isLoading: false,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHouse.fulfilled, (state, action) => {
        state.houses.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state by removing the deleted house from the houses array
        state.houses = state.houses.filter((house) => house.id !== action.payload.id);
      })
      .addCase(deleteHouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default addHouseSlice.reducer;
