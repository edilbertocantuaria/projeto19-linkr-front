import styled, { keyframes } from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const heartBeatAnimation = keyframes`
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

export const PostContainer = styled.div`
  display: flex;
  color: white;
  background-color: #171717;
  border-radius: 16px;
  padding: 15px;
  gap: 15px;
  margin-bottom: 16px;
  max-width: 611px;
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 17px;
`

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const StyledHeartIcon = styled(({ isfilled, ...props }) =>
  isfilled ? <AiFillHeart {...props} /> : <AiOutlineHeart {...props} />
)`
  font-size: 17px;
  cursor: pointer;
  color: ${props => (props.isfilled ? 'red' : 'white')};
  animation: ${props => (props.isfilled ? heartBeatAnimation : 'none')} 0.5s
    ease-in-out;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Lato';
  font-weight: 400;
  gap: 7px;
  font-size: 17px;
    line-height: 20px;
  h3 {
    font-size: 19px;
    line-height: 23px;
  }
  p {
    font-size: 17px;
    line-height: 20px;
  }
  span{
    color: green;
  }

`;

export const DataStyle = styled(Link)`
    display: flex;
    img{
        width: 30%;
        height: 100%;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }
    @media (max-width: 600px) {
        img{
          width: 6rem;
        }   
    }
`;
export const DataText = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    padding: 17px;
    border: 1px solid gray;
    border-right: none;
    border-radius: 10px 0px 0px 11px;
    p{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow-wrap: break-all;
        &:nth-child(1){
            font-size: 0.8rem;
            line-height: 19px;
            color: #CECECE;
        }
        &:nth-child(2){
            font-size: 0.6rem;
            line-height: 13px;
            color: #9B9595;
            text-align: justify;
        }
        &:nth-child(3){
            font-size: 0.5rem;
            line-height: 13px;
            color: #CECECE;
            -webkit-line-clamp: 2;
        }
    }
;
`