import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  persistUser: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setPersistUser: (state, action) => {
      state.persistUser = action.payload;
    }
  },
});

export const { setSignedIn, setPersistUser } = authSlice.actions;

export default authSlice.reducer;
