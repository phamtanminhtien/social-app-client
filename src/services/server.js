import axios from "axios";

const server_endpoint = "https://mt-social-media-app-server.herokuapp.com/";
const server = (token = false) => {
  const service = axios.create({
    baseURL: server_endpoint,
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
