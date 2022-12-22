import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Router from "./components/Router";
import { initializeVaccine } from "./reducers/vaccineReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeVaccine());
  }, []);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
