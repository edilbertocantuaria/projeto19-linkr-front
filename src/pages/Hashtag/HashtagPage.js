import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../../components/publications/Post';
import reactStringReplace from 'react-string-replace';

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

    axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag.trim()}`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err.message))

  }, [hashtag])
  return (
    <>
      <Container>
        <TimelineContainer>
          <Title data-test="hashtag-title">#{hashtag}</Title>
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
    </>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #333333;
  min-height: calc(100vh);
  height: calc(100% - 72px);
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 72px;
  @media (max-width: 600px) {
    margin-top: 70px;
    flex-direction: column-reverse;
    justify-content: flex-end;
}
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 611px;
`;

const AuxHashContainer = styled.div`
@media (max-width: 600px) {
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  }
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
    margin-top: 20px;
    max-height: 164px;
    padding: 6px;
    width: 100%;
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
    margin-top: 10px;
    font-size: 33px;
    margin-left: 17px;
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

const StyledHeartIcon = styled(({ isfilled, ...props }) =>
  isfilled ? <AiFillHeart {...props} /> : <AiOutlineHeart {...props} />
)`
  font-size: 17px;
  cursor: pointer;
  color: ${props => (props.isfilled ? 'red' : 'white')};
  animation: ${props => (props.isfilled ? heartBeatAnimation : 'none')} 0.5s
    ease-in-out;
`;
