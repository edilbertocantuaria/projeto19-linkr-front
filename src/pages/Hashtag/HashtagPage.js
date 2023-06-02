import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import Post from '../../components/publications/Post';

export default function HashtagPage() {
  const handleLike = () => {
    setIsFilled(!isFilled);
    setLikesCount(isFilled ? likesCount - 1 : likesCount + 1);
  };
  const { hashtag } = useParams()

  const [posts, setPosts] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);

  const [isFilled, setIsFilled] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    
    axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
      .then(res => {
        setAllHashtags(res.data)
      })
      .catch(err => console.log(err.message))

    axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?${Date.now()}`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err.message))

  }, [hashtag])
  return (
    <>
      <Container>
        <TimelineContainer>
          <Title>#{hashtag}</Title>
          {posts.map(post => (
            <Post
              key={post.id}
              postId={post.id}
              post={post}
              isFilled={isFilled}
              likesCount={likesCount}
              handleLike={handleLike}
            />
          )
          )}

        </TimelineContainer>
        <HashtagsContainer>
          <h1>trending</h1>
          <CustomHr />
          {allHashtags.map(h =>
            <p >
              <ReactHashtag onHashtagClick={val => {
                navigate(`/hashtag/${val.split('#')[1]}`, { replace: true })
              }}>
                {`#${h.hashtag}`}
              </ReactHashtag>
            </p>)}
        </HashtagsContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #333333;
  min-height: calc(100vh - 72px);
  height: calc(100% - 72px);
  display: flex;
  justify-content: center;
  gap: 25px;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    
  }
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 611px;
`;

const HashtagsContainer = styled.div`
  width: 301px;
  height: 406px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: white;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 160px;
  padding: 15px;
  p{
    font-size: 19px;
    margin-bottom: 5px;
    font-family: 'Lato';
    line-height: 23px;
  }
  h1{
    font-size: 27px;
    font-family: 'Oswald';
    line-height: 40px;
  }
  @media (max-width: 600px) {
    margin-top: 10px;
    max-height: 164px;
    overflow: scroll;
    padding: 6px;
    margin-left: 17px;

  }
`;
const CustomHr = styled.hr`
  border: 1px solid #484848;
  margin-top: 12px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    margin-top: 6px;
    margin-bottom: 10px;
  }
`;
const Title = styled.h1`
  color: white;
  font-family: 'Oswald';
  font-size: 43px;
  font-weight: 700;
  margin-bottom: 43px;
  margin-top: 78px;
  @media (max-width: 600px) {
    font-size: 33px;
    margin-left: 17px;
    margin-top: 20px;
    margin-bottom: 26px;
  }
`;

const heartBeatAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const PostContainer = styled.div`
  display: flex;
  color: white;
  background-color: #171717;
  border-radius: 16px;
  padding: 15px;
  gap: 15px;
  margin-bottom: 16px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 17px;
  }
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    margin-top: 15px;
  }
`

const StyledHeartIcon = styled(({ isfilled, ...props }) =>
  isfilled ? <AiFillHeart {...props} /> : <AiOutlineHeart {...props} />
)`
  font-size: 17px;
  cursor: pointer;
  color: ${props => (props.isfilled ? 'red' : 'white')};
  animation: ${props => (props.isfilled ? heartBeatAnimation : 'none')} 0.5s
    ease-in-out;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Lato';
  font-weight: 400;
  gap: 7px;
  h3 {
    font-size: 19px;
    line-height: 23px;
  }
  p {
    font-size: 17px;
    line-height: 20px;
  }
  div {
  }
`;