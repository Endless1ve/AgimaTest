import { axiosInstance } from "../servise";

const postsPath = "/posts/";

export function getPostsAPI(params) {
  return axiosInstance.get(postsPath, { params });
}

export function getSinglePostAPI(postId) {
  return axiosInstance.get(`${postsPath}${postId}`);
}

export function updatePostAPI(postId, params) {
  return axiosInstance.patch(`${postsPath}${postId}`, params);
}

export function sendPostAPI(params) {
  return axiosInstance.post(postsPath, params);
}

export function deletePostAPI(postId) {
  return axiosInstance.delete(`${postsPath}${postId}`);
}

export function clapPostAPI(postId, params) {
  return axiosInstance.patch(`${postsPath}${postId}`, params);
}
