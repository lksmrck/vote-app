import axiosBase, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/apiResponse";
import { VoteBase, Vote } from "../models/vote";
import { UserInLS } from "../models/user";

export const axios = axiosBase.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) =>
    axios.get<T>(url, config),
  post: <T>(url: string, body: NonNullable<unknown>) =>
    axios.post<T>(url, body),
  del: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  getUser: () =>
    requests
      .get("/auth/google/login/success", {
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res: any) => {
        if (res.data.data) return res.data.data.user;
      }),
};

const Votes = {
  create: async (vote: Vote) => {
    requests.post("/vote", vote).then((res) => {
      console.log(res);
    });
  },
  getVotesForUser: async (id: number) => {
    requests.get(`/votes/${id}`).then((res) => {
      console.log(res);
    });
  },
};

const agent = {
  Auth,
  Votes,
};

export default agent;
