import axios from "axios";
import { APILink } from "../const/linkAPI";
import { ROUTER_URL } from "../const/router.const";
import { store } from "../app/redux/store";
import { startLoading, stopLoading } from "../app/redux/loading/loadingSlice";

export const axiosInstance = axios.create({
  baseURL: APILink,
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`,
});

export const getState = (store: any) => {
  return store.getState();
};

axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const token = sessionStorage.getItem("token");
    if (config.headers === undefined) config.headers;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    store.dispatch(stopLoading());
    return handleErrorByToast(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoading());
    return response;
  },
  (err) => {
    store.dispatch(stopLoading());
    const { response } = err;
    if (response && response.status === 401) {
      setTimeout(() => {
        sessionStorage.removeItem("token");
        window.location.href = ROUTER_URL.SIGN_IN;
      }, 2000);
    }
    return handleErrorByToast(err);
  }
);

const handleErrorByToast = (error: any) => {
  store.dispatch(stopLoading());
  return Promise.reject(error);
};
