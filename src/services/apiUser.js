import axios from "axios";

function getUser(userId) {
    const promise = axios.get(`
    ${process.env.REACT_APP_API_URL}/user/${userId}`);
    return promise;
}

const apiUser = { getUser };
export default apiUser;
