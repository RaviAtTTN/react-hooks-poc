import axiosInstance from "../config/axios";
import {getToken} from "../utils";

export const signupService = (user) => {
  if(user.email && user.password && user.name) {
    return axiosInstance.post('/user', user);
  }
};

export const loginService = (user) => {
  return axiosInstance.get('/user', {
    params: user,
  })
};

export const isAuthService = (token = getToken()) => {
  return axiosInstance.get('/auth', {
    params: {
      token
    }
  })
};