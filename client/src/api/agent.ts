import axiosBase, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/apiResponse";

export const axios = axiosBase.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) =>
    axios.get<T>(url, config),
  post: <T>(url: string, body: NonNullable<unknown>) => {
    return axios.post<T>(url, body);
  },
  del: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  googleLogin: (token: string) =>
    requests
      .post<ApiResponse<any>>("/google-auth", token)
      .then((res: AxiosResponse<ApiResponse<any>>) => {
        console.log(res);
      }),
};

const agent = {
  Auth,
};

export default agent;
