import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push({
        id: action.payload._id || action.payload.id, // Handle both API responses and local data
        EnglishName: action.payload.EnglishName,
        UrduName: action.payload.UrduName,
        area: action.payload.area, // Stored as string (ObjectId)
        phoneNumber: action.payload.phoneNumber,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt
      });
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = {
          ...state.customers[index],
          ...action.payload,
          // Preserve existing timestamps unless updated
          updatedAt: new Date().toISOString() 
        };
      }
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;