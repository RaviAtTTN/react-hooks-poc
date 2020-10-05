import axiosInstance from "../config/axios";

export const getTagService = () => {
  return axiosInstance.get('/tag');
};

export const getArticlesByTag = (name) => {
  return axiosInstance.get('/tag/'+name)
};