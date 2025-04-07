import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-d0560/us-central1/api",

  // baseURL: "https://amazon-api-deploy-boc7.onrender.com/",
});
export { axiosInstance };
