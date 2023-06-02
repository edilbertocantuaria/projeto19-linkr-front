import React, { useState, useEffect } from 'react';
import apiPosts from '../../services/apiPosts.js';
import {
  Container,
  FormPublishContainer,
  PublishContainer,
  TimelineContainer,
  Title,
  LoadingStyle,
  EmptyStyle
} from './style.js';
import Post from '../../components/publications/Post.js';
import { ThreeDots } from 'react-loader-spinner';

export default function TimelinePage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [form, setForm] = useState({ link: '', article: null });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      const response = await apiPosts.postLink(form);
      setIsPublishing(false);
      setForm({ link: '', article: null });
      console.log(response.data);
    } catch (error) {
      setIsPublishing(false);
      alert(error.response.data);
    }
  };

  const handleLike = () => {
    setIsFilled(!isFilled);
    setLikesCount(isFilled ? likesCount - 1 : likesCount + 1);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiPosts.getPosts();
        setPosts(response.data);
        setIsLoading(false);
        console.log("posts:", posts);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isPublishing]);
  console.log("t",posts)
  return (
    <Container>
      <TimelineContainer>
        <Title>timeline</Title>
        <PublishContainer>
          <img
            src="https://yt3.ggpht.com/a/AATXAJw_Xyu7KMjEEeLFaFgSQeQk84Bj6GQqDeLd3w=s900-c-k-c0xffffffff-no-rj-mo"
            alt="Foto do Usuário"
          />
          <FormPublishContainer>
            <p>What are you going to share today?</p>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="http://..."
                name="link"
                value={form.link}
                onChange={handleForm}
                disabled={isPublishing}
              />
              <textarea
                placeholder="Awesome article about #javascript"
                name="article"
                value={form.article || ''}
                onChange={handleForm}
                disabled={isPublishing}
              />
              <button type="submit" disabled={isPublishing}>
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </form>
          </FormPublishContainer>
        </PublishContainer>
        {isLoading ? (
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
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              TL={true}
              postId={post.id}
              post={post}
              isFilled={isFilled}
              likesCount={likesCount}
              handleLike={handleLike}
            />
          ))
        ) : (
          <EmptyStyle>
            <p>There are no posts yet :(</p>
          </EmptyStyle>
        )}
      </TimelineContainer>
    </Container>
  );
}
