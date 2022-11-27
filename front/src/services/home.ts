import axios from "axios";
import { setInfo } from "./useToken";

export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const data = await axios.post("/api/login", credentials);
    const infoUser = { userId: data.data.data.idLoggedUser, token: data.data.data.token };
    setInfo(infoUser);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return error;
  }
};

export const createUser = async (credentials: { username: string; password: string }) => {
  try {
    const data = await axios.post("/api/create-user", credentials);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return error;
  }
};
