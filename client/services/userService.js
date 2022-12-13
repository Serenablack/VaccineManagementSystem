import axios from "axios";
import { BASE_URL } from "../utils/config";
const basePath = `${BASE_URL}api/users`;
const create = async (register) => {
  const response = await axios.post(basePath, register);
  console.log(response.data);
  return response.data;
};
export default { create };
