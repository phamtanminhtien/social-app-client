import axios from "axios";

const server = (token) => {
  const service = axios.create({
    baseURL: "http://localhost:4000/",
    timeout: 3000,
  });
  service.defaults.transformResponse = (result) => {
    result = JSON.parse(result);
    if (result.data) return { success: result.success, ...result.data };
    return result;
  };
  if (token) service.defaults.headers.common["Authorization"] = token;
  return service;
};

export default server;
