import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const postsPath = API_URL + "posts/";

export function getPosts(params) {
  return axios.get(postsPath, { params: params });
}

export function getPost(postId) {
  return axios.get(postsPath + postId);
}

export function clapPost(postId, params) {
  return axios.patch(postsPath + postId, params);
}

export function updatePost(postId, params) {
  return axios.patch(postsPath + postId, params);
}

export function sendPost(params) {
  return axios.post(postsPath, params);
}
