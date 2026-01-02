import axios from "axios";
import JwtService from "../services/JwtService";
import AuthService from "../services/api/AuthService";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const BASE_URL = import.meta.env.VITE_API_URL;
const AxiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptors
//Requests
AxiosClient.interceptors.request.use(
  (config) => {
    const isRefreshRequest = config.url.includes("refresh-token");
    if(isRefreshRequest)
      return config;

    const accessToken = JwtService.getAccessToken();
    if (accessToken != null)
      config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);

//Responses
AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isPersonalArea = originalRequest.url.includes("personal-area");


    if (
      error.response?.status != 401 ||
      originalRequest._retry == true ||
      !isPersonalArea
    )
      return Promise.reject(error);

    //Se sta già refreshando il token
    if (isRefreshing == true) {
      try {
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return await AxiosClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    originalRequest._retry = true;
    isRefreshing = true;

    console.error("Response error :: ", error.response);

    //Refresh token
    let response = null;
    try {
      response = await AuthService.refreshToken();
      JwtService.setAccessToken(response.accessToken);

      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

      isRefreshing = false;
      processQueue(null, response.accessToken);

      return await AxiosClient(originalRequest);
    } catch (e) {
      isRefreshing = false;
      processQueue(e, null);
      JwtService.removeAccessToken();
      window.location.href = "/";
      return await Promise.reject(e);
    }
  }
);

export default AxiosClient;
