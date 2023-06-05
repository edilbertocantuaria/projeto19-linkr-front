import styled, { keyframes } from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { BiTrash } from "react-icons/bi"
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

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
    transition:  all 300ms ease;
    background-size: cover;
    background-position: center center;
    &:hover{
      cursor: pointer;
      filter: brightness(70%);
    }
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

export const EditPost = styled(BsPencil)`
font-size: 16px;
cursor: pointer;
color: #FFFFFF;
margin-right: 10px;

`;

export const DeletePost = styled(BiTrash)`
font-size: 16px;
cursor: pointer;
color: #FFF;

`;

export const EditingPost = styled.textarea`
background-color: #FFFFFF;
color: #4C4C4C;
border-radius: 7px;
padding: 5px;
width: 100%;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 14px;

:focus{
  outline: none;
}

`

export const ContentContainer = styled.div`

  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: 'Lato';
  font-weight: 400;
  gap: 7px;
  font-size: 17px;
  line-height: 20px;
  h3 {
    display: flex;
    font-size: 19px;
    align-items: center;
    span {
      display: inline;
      transition:  all 300ms ease;
    }
    span:hover {
      cursor: pointer;
      filter: brightness(70%)
    }
    .editANDdelete{
      margin-left: auto;
      }
  }
  p {
    font-size: 17px;
    line-height: 20px;

    .editingPost {
        border-radius: 10px;
        background-color: pink;
    }
  }
  span{
    color: white;
  }

`;

export const DataStyle = styled(Link)`

width: 100%;

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
    border-radius: 10px 10px 10px 10px;
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
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
    }
;
`
export const Modal = styled(ReactModal)`
  width: 42%;
  height: 25.6%;

  @media (max-width: 600px) {
    width: 80%;
    height: auto;
    padding: 10px;
        }
 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background: #333333;
  border-radius: 50px;
  border: none;

  :focus{
    outline: none;
  }
  
  p{
  margin-top: 10px;
   font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  text-align: center;

  @media (max-width: 600px) {
   font-size: 30px;
    border-radius: 0;
  }

  color: #FFFFFF;
  }
  
  div{
    width: 70%;
    display: flex;
    justify-content: space-around;

    @media (max-width: 600px) {
      flex-direction: column;
      margin: 25px 0 10px 0;
    }
  }

  button{
    @media (max-width: 600px) {
      margin-bottom: 25px ;
          }
  }

   .cancelButton{
    width: 134px;
    height: 37px;
    font-size: 18px;
    color: #1877F2;
    background: #FFFFFF;
    border-radius: 5px;
    border:none
   }

   .confirmButton{
    width: 134px;
    height: 37px;
    font-size: 18px;
    color: #FFFFFF;
    background: #1877F2;
    border-radius: 5px;
    border:none
   }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;


