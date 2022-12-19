import axios from "axios";
import { BASE_URL } from "../utils/config";
const basePath = `${BASE_URL}api/vaccines`;

const getVaccine = async (id) => {
  const tokenFromLocal = JSON.parse(
    window.localStorage.getItem("authorizedUserToken")
  );

  const token = `bearer ${tokenFromLocal}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${basePath}/${id}`, config);

  return response.data;
};
const getAllVaccine = async () => {
  const tokenFromLocal = JSON.parse(
    window.localStorage.getItem("authorizedUserToken")
  );

  const token = `bearer ${tokenFromLocal}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(basePath, config);

  return response.data;
};
const postVaccine = async (vaccine) => {
  console.log(vaccine);
  const tokenFromLocal = JSON.parse(
    window.localStorage.getItem("authorizedUserToken")
  );

  const token = `bearer ${tokenFromLocal}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(basePath, vaccine, config);
  return response.data;
};

const putVaccine = async (id, vaccine) => {
  const tokenFromLocal = JSON.parse(
    window.localStorage.getItem("authorizedUserToken")
  );
  const token = `bearer ${tokenFromLocal}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${basePath}/${id}`, { vaccine }, config);
  return response.data;
};

const deleteVaccine = async (id) => {
  const tokenFromLocal = JSON.parse(
    window.localStorage.getItem("authorizedUserToken")
  );

  const token = `bearer ${tokenFromLocal}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${basePath}/${id}`, config);
  return response.data;
};
export default {
  getVaccine,
  postVaccine,
  putVaccine,
  getAllVaccine,
  deleteVaccine,
};
