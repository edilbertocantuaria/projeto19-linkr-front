import { ThreeDots } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller'; // Importa a biblioteca react-infinite-scroller
import apiPosts from '../../services/apiPosts'
import {
  AuxHashContainer,
  Container,
  CustomHr,
  EmptyStyle,
  FormPublishContainer,
  HashtagsContainer,
  LoadingStyle,
  PublishContainer,
  TimelineContainer,
  Title
} from './style';
import Post from './Post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import reactStringReplace from 'react-string-replace';
import { useNavigate } from 'react-router';
import ButtonFollow from '../button/ButtonFollow';

export default function Posts({ username, userImage, userId, handleFollow, following, isLoading }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [form, setForm] = useState({ link: '', article: null, userId: null });
  const [posts, setPosts] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [allHashtags, setAllHashtags] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Nova variável de estado para controlar se existem mais posts para carregar
  const [page, setPage] = useState(1); // Nova variável de estado para controlar o número da página atual


  const navigate = useNavigate();

  const handleForm = (e) => {
    console.log(e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      const userId = localStorage.getItem("userId");
      const updatedForm = { ...form, userId: userId };
      const response = await apiPosts.postLink(updatedForm);

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
    axios.get(`${process.env.REACT_APP_API_URL}/hashtags`)
      .then(res => {
        setAllHashtags(res.data)
      })
      .catch(err => console.log(err.message))
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;

        if (username === undefined) {
          response = await apiPosts.getPosts(page);
        } else if (username) {
          response = await apiPosts.getUserPosts(Number(userId), page);
        }

        console.log("response:", response.data);
        console.log("page:", page);
        console.log("response.data.length:", response.data.length);
        console.log("Has more posts?", hasMorePosts)
        console.log("posts:", posts)

        if (response.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts(response.data);
          setLoadingScreen(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingScreen(false);
      }
    };

    fetchPosts();
  }, [page, username, userId]);


  const loadMorePosts = () => {
    if (!hasMorePosts) {
      return
    }
    console.log("hasmorePosts:", hasMorePosts)
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <Container>
      <TimelineContainer>
        <Title>{username ? `${username}'s posts` : "timeline"}</Title>
        {!username && (
          <PublishContainer data-test="publish-box">
            <img
              src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
              style={{ backgroundImage: `url(${localStorage.getItem("image")})` }}
              alt="userImage"
            />
            <FormPublishContainer>
              <p>What are you going to share today?</p>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="http://..."
                  name="link"
                  data-test="link"
                  value={form.link}
                  onChange={handleForm}
                  disabled={isPublishing}
                />
                <textarea
                  placeholder="Awesome article about #javascript"
                  name="article"
                  data-text="description"
                  value={form.article || ''}
                  onChange={handleForm}
                  disabled={isPublishing}
                />
                <button type="submit" disabled={isPublishing}
                  data-test="publish-btn">
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </button>
              </form>
            </FormPublishContainer>
          </PublishContainer>
        )}
        {username && <ButtonFollow handleFollow={handleFollow} following={following} isLoading={isLoading}></ButtonFollow>}
        {loadingScreen ? (
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
        ) : (
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMorePosts}
            hasMore={hasMorePosts}
            loader={
              <LoadingStyle key={0}>
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
            }
          >
            {posts.length > 0 ? (
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
                <p data-test="message">There are no posts yet :(</p>
              </EmptyStyle>
            )}
          </InfiniteScroll>
        )}
      </TimelineContainer>
      <HashtagsContainer data-test="trending">
        <h1>trending</h1>
        <CustomHr />
        <AuxHashContainer>
          {allHashtags.map(h =>
            <p >
              {
                reactStringReplace(`#${h.hashtag}`, /#(\w+)/g, (match, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      navigate(`/hashtag/${match.slice(0)}`, { replace: true });
                    }}
                  >
                    #{match}
                  </span>
                ))
              }
            </p>)}
        </AuxHashContainer>
      </HashtagsContainer>
    </Container>
  );
}
