type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: captcha;
};
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});
export const authAPI = {
  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: boolean
  ) {
    const promise = instance.post(/auth/gilno);
  },
};
