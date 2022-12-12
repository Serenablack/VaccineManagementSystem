import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    inituser(state, action) {
      return action.payload;
    },
  },
});
export const { inituser } = userSlice.actions;

export default userSlice.reducer;
export const initializeUser = () => {
  return async (dispatch) => {
    const user = window.localStorage.getItem("authorizedUser");
    if (user) {
      const isuser = JSON.parse(user);
      const userAuth = await userService.getOne(isuser);
      dispatch(inituser(userAuth));
    }
  };
};
export const loginUser = (user) => {
  return async (dispatch) => {
    if (user) {
      window.localStorage.setItem("authorizedUser", JSON.stringify(user));
    }
    dispatch(inituser(user));
  };
};
