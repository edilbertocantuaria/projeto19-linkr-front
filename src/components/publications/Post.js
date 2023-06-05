import React, { useEffect, useRef, useState } from 'react';
import linkrLogo from '../../assets/linkrLogo.png';
import ReactHashtag from "react-hashtag"


import {
    ContentContainer,
    PostContainer,
    UserImage,
    StyledHeartIcon,
    EditPost,
    DeletePost,
    UserContainer,
    DataStyle,
    DataText,
    EditingPost
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

    const getUserPage = async (e) => {
        e.preventDefault();
        const username = e.currentTarget.textContent;

        try {
            const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
            const user = users.data.find((u) => u.username === username);
            navigate(`/user/${user.id}`);
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }

    const [ableToEdit, setAbleToEdit] = useState(false)
    const [saving, setSaving] = useState(false);

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


    const editingPostRef = useRef(null);
    function editPost(post) {
        if (ableToEdit) return setAbleToEdit(false);
        console.log("clicando para editar post");
        //IMPLEMENTAR AS REQUISIÇÕES AQUI
        console.log(post)
        setAbleToEdit(true);
    }

    const saveChanges = () => {
        setSaving(true);
        //IMPLEMENTAR AS REQUISIÇÕES AQUI
        setAbleToEdit(false);
        setSaving(false);
    };


    function deletePost(post) {
        console.log("clicando para excluir post");
        //IMPLEMENTAR AS REQUISIÇÕES AQUI
        console.log(post)
    }


    return isUserLoaded ? (
        <PostContainer data-test="post">
            <UserContainer>
                <UserImage
                    src={user ? user.image : linkrLogo}
                    alt="Foto do Usuário"
                />
                <StyledHeartIcon isfilled={isFilled} onClick={handleLike} />
                <p>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </p>
            </UserContainer>
            <ContentContainer>

                <h3 data-test="username"
                    onClick={getUserPage}>
                    {user ? user.username : "Unknown User"}

                    <div className='editANDdelete'>
                        <EditPost
                            onClick={() => editPost(post)}
                            data-test="edit-btn"
                        />
                        <DeletePost
                            onClick={() => deletePost(post)}
                            data-test="delete-btn" />

                    </div>
                </h3>

                <p>
                    {post.article && !(ableToEdit) ? (
                        <ReactHashtag
                            data-test="description"
                            onHashtagClick={val => navigate(`/hashtag/${val.split('#')[1]}`)}>
                            {post.article}
                        </ReactHashtag>
                    ) : ""}

                    {ableToEdit ? (
                        <EditingPost
                            defaultValue={post.article}
                            autoFocus
                            ref={editingPostRef}
                            onClick={() => setAbleToEdit(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setAbleToEdit(false);
                                } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    saveChanges();
                                }
                            }}
                            disabled={saving}
                        />
                    ) : ""}
                </p>

                <DataStyle data-test="link" onClick={handleDataStyleClick}>
                    <DataText>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{post.link}</p>
                    </DataText>

                </DataStyle>
            </ContentContainer>
        </PostContainer >
    ) : null;
}