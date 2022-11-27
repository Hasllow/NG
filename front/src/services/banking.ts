import axios from "axios";

export const getInfoUser = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const data = await axios
      .get(`/api/user-info/?userId=${userId}`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((data) => data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionUser = async (order = "desc", type = "all") => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const data = await axios
      .get(`/api/transactions/?userId=${userId}&order=${order}&typeTransaction=${type}`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((data) => data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTransactionUser = async (data: { username: string; value: string }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "/api/transfer",
      { username: data.username, amount: data.value },
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }
    );
    console.log(response);
    getTransactionUser();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return error;
  }
};
