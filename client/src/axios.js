import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:5000";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `${localStorage.getItem("token")}`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// axiosClient.defaults.headers.add(
//   "Access-Control-Allow-Methods",
//   "GET, POST, PUT, DELETE"
// );

axiosClient.defaults.withCredentials = true;
axiosClient.interceptors.response.use(
  function (response) {
    return { data: response.data, status: response.status };
  },
  function (error) {
    if (error.response.status === 401) {
      //Add Logic to
      //1. Redirect to login page or
      //2. Request refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
