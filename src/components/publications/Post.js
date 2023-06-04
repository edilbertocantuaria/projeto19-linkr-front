import React, { useEffect, useRef } from 'react';
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
    DataText,
    EditingPost
} from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Post({ post, isFilled, likesCount, handleLike, postId, TL }) {
    const handleDataStyleClick = () => {
        window.open(post.link, '_blank');
    };

    const navigate = useNavigate()

    const [ableToEdit, setAbleToEdit] = useState(false)
    const [saving, setSaving] = useState(false);

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
                        <ReactHashtag onHashtagClick={val => navigate(`/hashtag/${val.split('#')[1]}`)}>
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

