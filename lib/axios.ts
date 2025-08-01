import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default axiosInstance;
