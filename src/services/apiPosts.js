import axios from "axios";

function postLink(body) {
    const promise = axios.post(`
    ${process.env.REACT_APP_API_URL}/timeline`, body);
    return promise;
};

function getPosts(page) {
    const promise = axios.get(`
    ${process.env.REACT_APP_API_URL}/timeline`, {
        params: { page },
    });
    return promise;
}

function getUserPosts(id, page) {
    const promise = axios.get(` 
    ${process.env.REACT_APP_API_URL}/timeline/${id}`, {
        params: { page },
    });
    return promise;
}

function getFollowsUser(id, page) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/follow/${id}`,{
        params: { page }
    });
    return promise;
}


function CountFriends(id) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/followers/${id}` );
   
    return promise;
}


const apiPosts = { postLink, getPosts, getUserPosts, getFollowsUser, CountFriends };
export default apiPosts;