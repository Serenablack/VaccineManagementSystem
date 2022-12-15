import { Routes, Route } from "react-router-dom";

import Login from "./LoginPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);
// };

export default Router;
