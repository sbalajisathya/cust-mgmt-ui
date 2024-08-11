import axios from "axios";

const customAxios = axios.create({
  //baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
  },
});

// customAxios.interceptors.request.use((req) => {
//   console.log(`${req.method} ${req.url}`);
//   req.headers.authorization = "Basic dXNlcjpwYXNzd29yZA==";
//   return req;
// });

export default customAxios;
