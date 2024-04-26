import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const userPath = "users?login=";
const path = API_URL + userPath;

export function getUser(data, params = {}) {
  return axios.get(path + data, params);
}
