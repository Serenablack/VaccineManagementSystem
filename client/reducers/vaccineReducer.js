import { createSlice } from "@reduxjs/toolkit";

import vaccineServices from "../services/vaccineServices";

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState: [],
  reducers: {
    initVaccine(state, action) {
      return action.payload;
    },
  },
});
export const { initVaccine } = vaccineSlice.actions;

export default vaccineSlice.reducer;
export const initializeVaccine = () => {
  return async (dispatch) => {
    const vaccines = await vaccineServices.getAllVaccine();
    dispatch(initVaccine(vaccines));
  };
};
// export const singleVaccine = (id) => {
//   return async (dispatch) => {
//     const vaccine = await vaccineServices.getVaccine(id);

//     dispatch(initVaccine(vaccine));
//   };
// };

// export const updateVaccine = (vaccineUpdate) => {
//   return async () => {
//     const vaccine = await vaccineServices.putVaccine(vaccineUpdate);
//   };
// };
