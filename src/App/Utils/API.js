// imports Axios and exports a new configured instance of it.
import axios from "axios";
import { BASE_URL } from "./Urls";
 export const API = axios.create({
  baseURL: `${BASE_URL}`,
  responseType: "json",
//   headers:{Authorization:"Token "+localStorage.getItem("token")}
});
