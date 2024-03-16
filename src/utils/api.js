import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});