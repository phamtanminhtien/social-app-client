import axios from "axios";

const server = (token = false) => {
  const service = axios.create({
    baseURL: "http://localhost:4000/",
    timeout: 3000,
  });
  service.defaults.transformResponse = (result) => {
    result = JSON.parse(result);
    if (result.data) return { success: result.success, load: result.data };
    return result;
  };
  if (token)
    service.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  return service;
};
const server_endpoint = "http://localhost:4000";
const getLinkMedia = (name) => {
  if (!name) return null;
  return server_endpoint + "/media/" + name;
};
const getLinkUser = (id) => {
  if (!id) return null;
  return "/user/" + id;
};
export { server_endpoint, getLinkMedia, getLinkUser };

export default server;
