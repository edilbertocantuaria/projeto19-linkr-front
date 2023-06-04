import React, { useEffect } from 'react';
import linkrLogo from '../../assets/linkrLogo.png';
import ReactHashtag from "react-hashtag"
import { useState } from 'react';

import {
    ContentContainer,
    PostContainer,
    UserImage,
    StyledHeartIcon,
    EditPost,
    DeletePost,
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

    const [ableToEdit, setAbleToEdit] = useState (false)

    useEffect(() => {
        if (TL) {
            if (post.article) {
                if (post.article.includes("#")) {
                    let postComHashtag = post.article.split('#');
                    if (postComHashtag.length > 0) {
                        const addHashtags = async () => {
                            for (let i = 1; i < postComHashtag.length; i++) {
                                console.log("for");
                                axios.post(`${process.env.REACT_APP_API_URL}/hashtag`, {
                                    "postId": postId,
                                    "hashtag": postComHashtag[i]
                                })
                                    .then(res => console.log(res.data))
                                    .catch(err => console.log(err.message))
                            }
                        };
                        addHashtags();
                    }
                }
            }
        }
    }, [])

    function editPost(post) {
        console.log("clicando para editar post");
        //IMPLEMENTAR AS REQUISIÇÕES AQUI
        console.log(post)
    }


    function deletePost(post) {
        console.log("clicando para excluir post");
        //IMPLEMENTAR AS REQUISIÇÕES AQUI


    }


    return (
        <PostContainer>
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
                <h3>Bob Esponja

                    <div className='editANDdelete'>
                        <EditPost
                            onClick={() => editPost(this)}
                            data-test="edit-btn"
                        />
                        <DeletePost
                            onClick={() => deletePost(this)} 
                            data-test="delete-btn"/>
                            
                    </div>
                </h3>

                <p>
                    {post.article ? (
                        <ReactHashtag onHashtagClick={val => navigate(`/hashtag/${val.split('#')[1]}`)}>
                            {post.article}
                        </ReactHashtag>
                    ) : ""}

                </p>
                <DataStyle onClick={handleDataStyleClick}>
                    <DataText>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{post.link}</p>
                    </DataText>

                </DataStyle>
            </ContentContainer>
        </PostContainer>
    );
}

