import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;  // for create react app
console.log(import.meta.env);
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((request) => {
  request.headers.myToken = "My Encripted Token";
  return request;
});

export const fetchData = async (url, method, payload) => {
  if (method === "get") {
    try {
      return axios.get(url).then((response) => response);
    } catch (error) {
      return error;
    }
  }
  if (method === "post") {
    try {
      return axios.post(url, payload).then((response) => response);
    } catch (error) {
      return error;
    }
  }
  if (method === "patch") {
    try {
      return axios.patch(url, payload).then((response) => response);
    } catch (error) {
      return error;
    }
  }
  if (method === "delete") {
    try {
      return axios.delete(url).then((response) => response);
    } catch (error) {
      return error;
    }
  }
};
