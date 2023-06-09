import styled, { keyframes } from "styled-components"
import Posts from "../../components/publications/Posts"
import { ThreeDots } from 'react-loader-spinner';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiUser from "../../services/apiUser";
import axios from "axios";

export default function UserPage() {
    const { id } = useParams();
    const [following, setFollowing] = useState(false);
    const [user, setUser] = useState([]);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [isUser, setIsUser] = useState(false)

    const idFromLocalStorage = localStorage.getItem("userId");

    async function handleFollow() {
        setIsLoading(true)
        if (!following) {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/follow/${user.id}`, { followerId: idFromLocalStorage })
                setFollowing(true);
                setIsLoading(false);
            } catch (err) {
                alert(err.response);
            }
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/unfollow/${user.id}`, { followerId: idFromLocalStorage })
            setFollowing(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setFollowing(false)
        apiUser.getUser(id)
        .then((response) => {
            if (idFromLocalStorage === id) {
                setIsUser(true)
            } else {
                const followers = response.data.followers.rows;
                const follower = followers.find(f => Number(f.followerId) === Number(idFromLocalStorage));
                if (follower) {
                    setFollowing(true);
                }
            }
            const userData = response.data.user;
            setUser(userData);
            setLoadingScreen(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id])

    return (
        <>
        {loadingScreen ? (
            <LoadingContainer>
                <LoadingStyle>
                <p>Loading</p>
                <ThreeDots
                    height="15"
                    width="15"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </LoadingStyle>
          </LoadingContainer>
        ) : (
            <Posts 
                user={user} 
                userId={id} 
                handleFollow={handleFollow} 
                following={following} 
                isLoading={isLoading}
                isUser={isUser}
            />
        )}
        </>
    )
}

const LoadingContainer = styled.div`
    background-color: #333333;
    min-height: calc(100vh - 72px);
    height: calc(100% - 72px);
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
    margin-top: 72px;
`

const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
`;

const LoadingStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  p {
    margin-top: 30px;
    color: white;
    font-family: 'Oswald';
    font-size: 24px;
    font-weight: 700;
    animation: ${pulseAnimation} 2s infinite;
  }
`;