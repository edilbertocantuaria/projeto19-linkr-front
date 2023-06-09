import React, { useEffect, useRef, useState } from 'react';
import reactStringReplace from 'react-string-replace'
import linkrLogo from '../../assets/linkrLogo.png';

import {
    ContentContainer,
    Reposted,
    PostContainer,
    UserImage,
    StyledHeartIcon,
    EditPost,
    CommentPost,
    SharePost,
    DeletePost,
    UserContainer,
    DataStyle,
    DataText,
    EditingPost,
    Modal,
    GeralCommContainer,
    GeralCommAux,
    Overlay
} from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../services/apiUser';
import Comment from '../comment/Comment';
import InputComment from '../comment/InputComment';

export default function Post({ post, isFilled, likesCount, commentsCount, isCommented, sharesCount, isShared, handleLike, postId, TL,userId }) {
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [ableToEdit, setAbleToEdit] = useState(false)
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([])
    const [showCom, setShowCom] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [isfilled, setIsfilled] = useState(false);
    const [issharer, setIsshared] = useState(false);
    const [loadComments, setLoadComments] = useState(false)

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
                    console.log("post user",userData)
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments/${postId}`)
            .then(res => {
                setComments(res.data)
                console.log("comments",res.data)
            })
            .catch(err => console.log(err.message))
    }, [loadComments])

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
        console.log(post);
        handleCloseDeleteModal();
    }

    function sharePost(post) {
        console.log("clicando para repostar post");
        console.log(post);
        handleCloseRepostModal();
    }

    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleOpenRepostModal = () => {
        setShowRepostModal(true);
    };

    const handleCloseRepostModal = () => {
        setShowRepostModal(false);
    };

    return isUserLoaded ? (
        <>

            <Reposted>
                <SharePost className='repostedBold' /> <p>Re-posted by <span>you</span></p>
            </Reposted>

            <PostContainer data-test="post">
                <UserContainer>
                    <UserImage
                        src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
                        style={{ backgroundImage: `url(${user.image})` }}
                        alt="userImage"
                        onClick={() => getUserPage(user.username)}
                    />

                    <div className="interactions">
                        <StyledHeartIcon isfilled={isFilled} onClick={handleLike} />
                        <p>
                            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                        </p>
                        <CommentPost iscommented={isCommented} onClick={() => setShowCom(!showCom)} data-test="comment-btn" />
                        <p data-test="comment-counter" >
                            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                        </p>
                        <SharePost isshared={isShared} onClick={handleOpenRepostModal} data-test="repost-btn" />
                        <p data-test="repost-counter">
                            {sharesCount} {sharesCount === 1 || sharesCount === 0 ? 're-post' : 're-posts'}
                        </p>

                        <Modal
                            isOpen={showRepostModal}
                            onRequestClose={handleCloseRepostModal}
                            ariaHideApp={false}
                        >
                            <p>Do you want to re-post this link?</p>
                            <div>
                                <button className="cancelButton" data-test="cancel" onClick={handleCloseRepostModal}>No, cancel</button>
                                <button className="confirmButton" data-test="confirm" onClick={() => sharePost(post)}>Yes, share!</button>
                            </div>
                        </Modal>
                    </div>

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

                                onClick={handleOpenDeleteModal}
                                data-test="delete-btn"
                            />

                            <Modal

                                isOpen={showDeleteModal}
                                onRequestClose={handleCloseDeleteModal}
                                ariaHideApp={false}
                            >
                                <p>Are you sure you want to delete this post?</p>
                                <div>
                                    <button className="cancelButton" data-test="cancel" onClick={handleCloseDeleteModal}>No, go back</button>
                                    <button className="confirmButton" data-test="confirm" onClick={() => deletePost(post)}>Yes, delete it</button>
                                </div>
                            </Modal>

                        </div>
                    </h3>
                    <p data-test="description">
                        {post.article && !(ableToEdit) ? (
                            reactStringReplace(post.article, /#(\w+)/g, (match, i) => (
                                <span
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

                    <DataStyle data-test="link" onClick={handleDataStyleClick} href={post.link}>
                        <DataText>
                            <p>{post.title}</p>
                            <p>{post.description}</p>
                            <p>{post.link}</p>
                        </DataText>


                    </DataStyle>


                </ContentContainer>

            </PostContainer >
            {showCom ? (
                <GeralCommContainer data-test="comment-box">
                    {comments.map(c => <Comment userId={c.userId} text={c.comments} img={c.img} username={c.username} />)}
                    <InputComment postId={postId} userId={post.userId} loadComments={loadComments} setLoadComments={setLoadComments} />
                </GeralCommContainer>
            ) : <GeralCommAux />}
        </>
    ) : null;
}


