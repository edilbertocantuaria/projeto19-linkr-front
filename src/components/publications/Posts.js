import { ThreeDots } from 'react-loader-spinner';
import apiPosts from '../../services/apiPosts'
import { 
    Container, 
    EmptyStyle, 
    FormPublishContainer, 
    LoadingStyle, 
    PublishContainer, 
    TimelineContainer, 
    Title 
} from './style';
import Post from './Post';
import { useEffect, useState } from 'react';


export default function Posts({ username, userImage, userId }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [form, setForm] = useState({ link: '', article: null, userId: null });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    console.log(username)
    if (username === undefined) {
        async function fetchPosts()  {
            try {
              const response = await apiPosts.getPosts();
              setPosts(response.data);
              setIsLoading(false);
              console.log("posts:", posts);
            } catch (error) {
              console.error(error);
              setIsLoading(false);
            }
        }
        fetchPosts();
    } else if (username) {
        async function fetchUserPosts() {
            try {
                console.log(userId)
                const response = await apiPosts.getUserPosts(Number(userId));
                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        fetchUserPosts();
    }
  }, [isPublishing]);
  return (
    <Container>
      <TimelineContainer>
        <Title>{username ? `${username}'s posts` : "timeline"}</Title>
        {username ? <></> : (
        <PublishContainer>
        <img
            src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
            style={{backgroundImage: `url(${localStorage.getItem("image")})`}}
            alt="userImage"
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
        )}
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