import axios from "axios";
import { ResponseType } from "./todolist-api";
type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});
export const authAPI = {
  me(data:LoginParamsType) {
    const promise = instance.get<ResponseType<{id: string, email: string, login: string}>>("auth/me")
  }
  login(data: LoginParamsType) {
    const promise = instance.post<ResponseType<{ userId?: number }>>(
      "auth/login",
      data
    );
    return promise;
  },
};
