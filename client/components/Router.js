import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage";
import VaccineAddForm from "./VaccineAddForm";
import VaccineDetail from "./VaccineDetail";
import VaccineForm from "./VaccineForm";
import VaccineList from "./VaccineList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/vaccines" element={<VaccineList />} />
      <Route path="/vaccines/:id" element={<VaccineDetail />} />
      <Route path="/vaccines/:id/edit" element={<VaccineForm />} />
      <Route path="/vaccines/add" element={<VaccineAddForm />} />
    </Routes>
  );
};

export default Router;
