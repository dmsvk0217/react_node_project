import axios from "axios";
import { GET_LIST } from "./types";

export function getList() {
  const request = axios
    .get("/api/lists/", { withCredentials: true })
    .then((response) => response.data);

  return {
    type: GET_LIST,
    payload: request,
  };
}
