import axios from 'axios';
import {API_BASE_URL} from "../constants";
import {getToken} from '../utils';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

});

// Axios Interceptors

axiosInstance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if(error.response && error.response.status === 401){
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  return config;
});


export default axiosInstance;