import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export function getPosts(path, params) {
  return axios.get(API_URL + path, { params });
}