
// src/features/loaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state with isLoading set to false
const initialState = {
    isLoading: false,
};

// Create the slice with ShowLoading and HideLoading actions
const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        // Action to show the loading spinner
        ShowLoading: (state) => {
            state.isLoading = true;
        },
        // Action to hide the loading spinner
        HideLoading: (state) => {
            state.isLoading = false;
        },
    },
});

// Export the actions (ShowLoading and HideLoading)
export const { ShowLoading, HideLoading } = loaderSlice.actions;

// Export the reducer to be added to the store
export default loaderSlice.reducer;
