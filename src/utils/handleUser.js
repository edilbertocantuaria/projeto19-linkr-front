import getUsers from "./getUser.js"

export default async function handleMyUser(setMyUser, setReturnToSignUp) {
    await getUsers(setMyUser, 'my_user', setReturnToSignUp)
}