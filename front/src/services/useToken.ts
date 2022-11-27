import axios from "axios";
export const getToken = () => {
  try {
    return localStorage.getItem("token") ?? "";
  } catch (error) {
    return error;
  }
};

export const setInfo = (userInfo: { userId: string; token: string }) => {
  try {
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("userId", userInfo.userId);
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async () => {
  try {
    const tokenString = getToken();
    const data = await axios.post("/api/verify-token", { tokenString });

    if (data.data.status === 200) {
      return data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return error;
    }
  }
};
