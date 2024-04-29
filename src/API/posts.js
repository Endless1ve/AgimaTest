import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const postsPath = API_URL + "posts/";

export function getPostsAPI(params) {
  return axios.get(postsPath, { params: params });
}

export function getPostAPI(postId) {
  return axios.get(postsPath + postId);
}

export function clapPostAPI(postId, params) {
  return axios.patch(postsPath + postId, params);
}

export function updatePostAPI(postId, params) {
  return axios.patch(postsPath + postId, params);
}

export function sendPostAPI(params) {
  return axios.post(postsPath, params);
}

export function deletePostAPI(postId) {
  return axios.delete(postsPath + postId);
}
