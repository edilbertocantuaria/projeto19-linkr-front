import axios from "axios";

function postLink(body) {
    const promise = axios.post(`
    ${process.env.REACT_APP_API_URL}/timeline`, body);
    return promise;
};

function getPosts() {
    const promise = axios.get(`
    ${process.env.REACT_APP_API_URL}/timeline`);
    return promise;
}

function getUserPosts(id) {
    const promise = axios.get(`
    ${process.env.REACT_APP_API_URL}/timeline/${id}`);
    return promise;
}

const apiPosts = { postLink, getPosts, getUserPosts };
export default apiPosts;