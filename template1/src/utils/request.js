import axios from "axios";

export const baseURL = "";
export const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});

//请求拦截
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
request.interceptors.response.use(
  (response) => {
    const data = response.data;
    console.log(data);
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
