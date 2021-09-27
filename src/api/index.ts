import axios, { AxiosResponse } from "axios";
import { getCookie } from "../util/cookie";
import { User } from "../userContext";

interface ErrorObject {
  response: {
    data: string;
  };
}

interface TokenResponseObject {
  token: string;
}

const apiProvider = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let authToken = getCookie("token");
if (authToken.length > 0) {
  apiProvider.defaults.headers.common["Authorization"] = authToken;
}

const login = async (username: string, password: string) => {
  return apiProvider
    .post("/login", { username, password })
    .then((response: AxiosResponse<TokenResponseObject>) => {
      document.cookie = `token=${response.data.token}`;
      apiProvider.defaults.headers.common["Authorization"] =
        response.data.token;
    })
    .catch((e: ErrorObject) => {
      console.log(e.response);
      throw new Error(e.response.data);
    });
};

const getUser = async (): Promise<User> => {
  return apiProvider
    .get("/user")
    .then((response: AxiosResponse<User>) => response.data)
    .catch((e: ErrorObject) => {
      console.log(e.response.data);
      return {
        username: "",
        firstName: "",
        lastName: "",
      };
    });
};

export { login, getUser };
