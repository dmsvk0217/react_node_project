import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/user/login", dataToSubmit, { withCredentials: true })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function loginUser2(dataToSubmit) {
  const request = axios
    .post("/api/user/login", dataToSubmit, { withCredentials: true })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
