import { axiosInstance } from "../servise";

const userPath = "users?login=";

export function getUser(data) {
  return axiosInstance.get(`${userPath}${data}`);
}
