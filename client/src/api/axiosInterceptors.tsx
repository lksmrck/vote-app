import { ReactNode, useEffect, useState, FC } from "react";
// import useAuthContext from "../store/AuthContext";
import { axios } from "./agent";
import { AxiosError, AxiosResponse } from "axios";
// import { router } from "../routes";
// import useRefreshToken from "../hooks/useRefreshToken";
import { getLocalStorage, getSessionStorage } from "../utils/getStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuthContext from "../contexts/AuthContext";

const AxiosInterceptors: FC<{ children: any }> = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const navigate = useNavigate();
  const { logoutUser, currentUser } = useAuthContext();
  //   const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // const token = getSessionStorage("user")?.token;
        const token = getLocalStorage("user")?.token;
        // If Authorization headers were already set, it's a re-try of 401 (below)
        if (token && !config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseInterceptor = axios.interceptors.response.use(
      // Response handling
      (response) => response,

      //Error handling
      async (error: AxiosError) => {
        const prevRequest = error?.config;
        let refreshSent = false;

        const err = error.response as AxiosResponse;
        const data = err?.data ?? null;
        const status = err?.status ?? null;
        const config = err?.config ?? null;
        const headers = err?.headers ?? null;
        const request = err?.request ?? null;

        // const { data, status, config, headers, request } =
        //   error.response as AxiosResponse;
        switch (status) {
          case 400:
            if (
              config?.method === "get"
              //  && data?.errors?.hasOwnProperty("id")
            ) {
              navigate("/not-found");
            } else if (data?.errorMessage) {
              if (
                request.responseURL.includes("register") ||
                request.responseURL.includes("login")
              ) {
                toast.error(data.errorMessage);
              } else {
                navigate("/bad-request");
                toast.error(data?.errorMessage);
              }
            } else {
              navigate("/bad-request");
              toast.error("An error occured - bad request.");
            }
            break;
          case 401:
            if (
              // Pokud je invalid token, tak usera odhlásíme
              status === 401 &&
              headers["www-authenticate"]?.startsWith("Bearer") &&
              !refreshSent
            ) {
              refreshSent = true;
              //   const newAccessToken = await refresh();
              //   prevRequest!.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(prevRequest!);
            } else {
              data?.errorMessage
                ? toast.error("Your session expired. Please login again.")
                : toast.error("Unauthorized");
              console.log("Logging out.");
              logoutUser();
              navigate("/login");
            }
            break;
          case 403:
            toast.error("Forbidden");
            break;
          case 404:
            navigate("/not-found");
            break;
          case 500:
            toast.error("Server error");
            break;
        }
        return Promise.resolve(error);
      },
    );
    setIsSet(true);

    return () => {
      axios.interceptors.request.eject(responseInterceptor);
      axios.interceptors.response.eject(requestInterceptor);
    };
  }, []);

  return isSet && children;
};

export default AxiosInterceptors;
