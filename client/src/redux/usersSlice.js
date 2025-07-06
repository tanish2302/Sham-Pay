import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        reloadUser: false,
    },
    reducers: {
        SetUser(state, action) {
            state.user = action.payload;
        },
        ReloadUser(state, action) {
            state.reloadUser = action.payload;
        },
    },
});

export const { SetUser, ReloadUser } = userSlice.actions;
export default userSlice.reducer;