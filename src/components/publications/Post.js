import React, { useEffect, useRef, useState } from 'react';
import reactStringReplace from 'react-string-replace'
import linkrLogo from '../../assets/linkrLogo.png';



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
    EditingPost,
    Modal,
    Overlay
} from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../services/apiUser';

export default function Post({ post, isFilled, likesCount, handleLike, postId, TL }) {
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [ableToEdit, setAbleToEdit] = useState(false)
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleDataStyleClick = () => {
        window.open(post.link, '_blank');
    };

    const getUserPage = async (username) => {
        try {
            const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
            const user = users.data.find((u) => u.username === username);
            console.log(user)
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
                    const userData = response.data.user;
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
                    let regex = /#(\w+)/g;
                    let palavras = [];
                    for (let match of post.article.matchAll(regex)) {
                        palavras.push(match[1])
                    }
                    if (palavras.length > 0) {
                        const addHashtags = async () => {
                            for (let i = 0; i < palavras.length; i++) {
                                axios.post(`${process.env.REACT_APP_API_URL}/hashtag`, {
                                    "postId": postId,
                                    "hashtag": palavras[i]
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
        setShowModal(true)

        //IMPLEMENTAR AS REQUISIÇÕES AQUI
        console.log(post)
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return isUserLoaded ? (
        <PostContainer data-test="post">
            <UserContainer>
                <UserImage
                    src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
                    style={{ backgroundImage: `url(${user.image})` }}
                    alt="userImage"
                    onClick={() => getUserPage(user.username)}
                />
                <StyledHeartIcon isfilled={isFilled} onClick={handleLike} />
                <p>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </p>
            </UserContainer>
            <ContentContainer>
                <h3 data-test="username">
                    <span onClick={() => getUserPage(user.username)}>
                        {user ? user.username : "Unknown User"}</span>
                    <div className='editANDdelete'>
                        <EditPost
                            onClick={() => editPost(post)}
                            data-test="edit-btn"
                        />
                        <DeletePost
                            onClick={handleOpenModal}
                            data-test="delete-btn"
                        />

                        <Modal
                            isOpen={showModal}
                            onRequestClose={handleCloseModal}
                            ariaHideApp={false}
                        >

                            <p>Are you sure you want to delete this post?</p>
                            <div>
                                <button className="cancelButton" data-test="cancel" onClick={handleCloseModal}>No, go back</button>
                                <button className="confirmButton" data-test="confirm" onClick={() => deletePost(post)}>Yes, delete it</button>
                            </div>

                        </Modal>

                    </div>
                </h3>
                <p>
                    {post.article && !(ableToEdit) ? (
                        reactStringReplace(post.article, /#(\w+)/g, (match, i) => (
                            <span
                                data-test="description"
                                key={i}
                                onClick={() => {
                                    navigate(`/hashtag/${match.slice(0)}`);
                                }}
                            >
                                #{match}
                            </span>
                        ))
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