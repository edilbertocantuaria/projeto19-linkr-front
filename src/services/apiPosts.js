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

const apiPosts = { postLink, getPosts };
export default apiPosts;