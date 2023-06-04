import React, { useEffect } from 'react';
import linkrLogo from '../../assets/linkrLogo.png';
import ReactHashtag from "react-hashtag"
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

export default function Post({ post, isFilled, likesCount, handleLike, postId, TL }) {
    const handleDataStyleClick = () => {
        window.open(post.link, '_blank');
    };

    const navigate = useNavigate()

    useEffect(() => {
        if (TL) {
            if (post.article) {
                if (post.article.includes("#")) {
                    let regex=/#(\w+)/g;
                    let palavras=[];
                    for(let match of post.article.matchAll(regex)){
                        palavras.push(match[1])
                    }
                    console.log("gpt",palavras)
                    if (palavras.length > 0) {
                        const addHashtags = async () => {
                            for (let i = 0; i < palavras.length; i++) {
                                axios.post(`${process.env.REACT_APP_API_URL}/hashtag`, {
                                    "postId": postId,
                                    "hashtag": palavras[i]
                                })
                                .then(res=>console.log(res.data))
                                .catch(err=>console.log(err.message))
                            }
                        };
                        addHashtags();
                    }
                }
            }
        }
    }, [])
    return (
        <PostContainer data-test="post">
            <UserContainer>
                <UserImage
                    src="https://yt3.ggpht.com/a/AATXAJw_Xyu7KMjEEeLFaFgSQeQk84Bj6GQqDeLd3w=s900-c-k-c0xffffffff-no-rj-mo"
                    alt="Foto do Usuário"
                />
                <StyledHeartIcon isfilled={isFilled} onClick={handleLike} />
                <p>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </p>
            </UserContainer>
            <ContentContainer>
                <h3 data-test="username">Bob Esponja</h3>

                <p>
                    {post.article ? (
                        <ReactHashtag data-test="description" onHashtagClick={val => navigate(`/hashtag/${val.split('#')[1]}`) }>
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
    );
}

