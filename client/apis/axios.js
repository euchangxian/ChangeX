import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050', // Set your API base URL
  withCredentials: true, // Include credentials in all requests
});

export default axiosInstance;