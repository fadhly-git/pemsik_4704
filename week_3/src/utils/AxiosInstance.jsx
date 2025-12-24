import axios from "axios";

const base = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "/api";

const AxiosInstance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;