import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import vaccineReducer from "./reducers/vaccineReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    vaccine: vaccineReducer,
  },
});
console.log(store.getState());

export default store;
