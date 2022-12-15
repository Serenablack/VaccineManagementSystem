import axios from "axios";

import { BASE_URL } from "../utils/config";
const basePath = `${BASE_URL}api/login`;
const create = async (credentials) => {
  const response = await axios.post(basePath, credentials);

  return response.data;
};

export default { create };
