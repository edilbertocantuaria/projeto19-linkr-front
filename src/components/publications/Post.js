import React, { useEffect, useState } from 'react';
import linkrLogo from '../../assets/linkrLogo.png';
import ReactHashtag from 'react-hashtag';
import {
    ContentContainer,
    PostContainer,
    UserImage,
    StyledHeartIcon,
    UserContainer,
    DataStyle,
    DataText
} from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../services/apiUser';

export default function Post({ post, isFilled, likesCount, handleLike, postId, TL }) {
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const navigate = useNavigate();

    const handleDataStyleClick = () => {
        window.open(post.link, '_blank');
    };

    const getUserPage = async (username) => {
        try {
            const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
            const user = users.data.find((u) => u.username === username);
            navigate(`/user/${user.id}`);
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }

    useEffect(() => {
        if (post.userId) {
            apiUser.getUser(post.userId)
                .then((response) => {
                    const userData = response.data;
                    setUser(userData);
                    setIsUserLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [post.userId]);

    return isUserLoaded ? (
        <PostContainer data-test="post">
            <UserContainer>
                <UserImage
                    src={user ? user.image : linkrLogo}
                    alt="Foto do Usuário"
                    onClick={() => getUserPage(user.username)}
                />
                <StyledHeartIcon isfilled={isFilled} onClick={handleLike} />
                <p>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </p>
            </UserContainer>
            <ContentContainer>
                <h3 data-test="username"><span onClick={() => getUserPage(user.username)}>
                    {user ? user.username : "Unknown User"}</span></h3>
                <p>
                    {post.article ? (
                        <ReactHashtag
                            data-test="description"
                            onHashtagClick={(val) => navigate(`/hashtag/${val.split('#')[1]}`)}
                        >
                            {post.article}
                        </ReactHashtag>
                    ) : ""}
                </p>
                <DataStyle data-test="link" onClick={handleDataStyleClick}>
                    <DataText>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{post.link}</p>
                    </DataText>
                    <img src={post.image ? post.image : linkrLogo} />
                </DataStyle>
            </ContentContainer>
        </PostContainer>
    ) : null;
}
