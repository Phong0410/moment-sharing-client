import axiosClient from "./axiosClient";

const auth = {
  login: (data) => {
    const url = "/users/login";
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = "/users/register";
    return axiosClient.post(url, data);
  },
};

export default auth;
