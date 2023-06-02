import axios from "axios";

export default async function getUsers(setUserFunction, mode, setReturnToSignUp) {
    const token = localStorage.getItem('token')
    if (!token || !['users', 'my_user'].includes(mode)) {
        if (!!setReturnToSignUp) setReturnToSignUp(true)
        return
    }
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${mode}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setUserFunction(data)
    } catch (error) {
        console.error(error)
    }
    return
}