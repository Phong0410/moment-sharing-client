import axiosClient from "./axiosClient";

const posts = {
  create: (data) => {
    const url = "/posts";
    return axiosClient.post(url, data);
  },
  getPosts: () => {
    const url = "/posts";
    return axiosClient.get(url);
  },
  getPostsByUser: (data) => {
    const url = `/posts/users/${data.id}`;
    return axiosClient.get(url);
  },
  likePost: (data) => {
    const url = `/posts/${data.id}/like`;
    return axiosClient.patch(url);
  },
  deletePost: (data) => {
    const url = `/posts/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default posts;
