import axiosInstance from "../config/axios";

export const postArticleService = (article) => {
  return axiosInstance.post('/article', article);
};

export const getArticleById = (article_id) => {
  return axiosInstance.get('/article/'+article_id);
};