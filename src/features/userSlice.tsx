import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  currentPage: string; // Add currentPage state
}

const initialState: UserState = {
  user: null,
  currentPage: 'login', // Default page
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.currentPage = 'logout'; // Redirect to logout page on login
    },
    logout: (state) => {
      state.user = null;
      state.currentPage = 'login'; // Redirect to login page on logout
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { login, logout, setPage } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectCurrentPage = (state: any) => state.user.currentPage;

export default userSlice.reducer;
