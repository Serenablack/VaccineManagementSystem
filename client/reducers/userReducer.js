import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    inituser(state, action) {
      return action.payload;
    },
  },
});
export const { inituser } = userSlice.actions;

export default userSlice.reducer;

export const loginUser = (
  user
  // { email, password }
) => {
  return async (dispatch) => {
    // const user = await loginService.create({
    //   email,
    //   password,
    // });

    dispatch(inituser(user));

    if (user) {
      window.localStorage.setItem(
        "authorizedUserToken",
        JSON.stringify(user.token)
      );
    }
  };
};
