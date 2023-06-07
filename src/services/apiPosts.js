import axios from "axios";

function postLink(body) {
  const promise = axios.post(`
  ${process.env.REACT_APP_API_URL}/timeline`, body);
  return promise;
}

function getPosts(page) {
  const promise = axios.get(`
  ${process.env.REACT_APP_API_URL}/timeline`, {
    params: { page },
  });
  return promise;
}

function getUserPosts(id, page, pageSize) {
  const promise = axios.get(`
  ${process.env.REACT_APP_API_URL}/timeline/${id}`, {
    params: { page, pageSize },
  });
  return promise;
}

const apiPosts = { postLink, getPosts, getUserPosts };
export default apiPosts;
