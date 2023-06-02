import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  background-color: #333333;
  min-height: calc(100vh - 72px);
  height: calc(100% - 72px);
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
`;

export const TimelineContainer = styled.div`
  width: 100%;
  max-width: 611px;
`;

export const Title = styled.h1`
  color: white;
  font-family: 'Oswald';
  font-size: 43px;
  font-weight: 700;
  margin-bottom: 43px;
  margin-top: 78px;
  @media (max-width: 600px) {
    margin-left: 17px;
    margin-top: 43px;
    margin-bottom: 26px;
  }
`;

export const PublishContainer = styled.div`
  background-color: white;
  min-height: fit-content;
  border-radius: 16px;
  display: flex;
  padding: 15px;
  gap: 15px;
  margin-bottom: 29px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    border-radius: 0;
    img{
      display: none;
    }
  }
`;

export const FormPublishContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  p{
    font-family: 'Lato';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    margin-bottom: 30px;
    input {
      background-color: #efefef;
      border: none;
      border-radius: 5px;
      padding-left: 10px;
      min-height: 30px;
      outline-color: #151515;
        &::placeholder {
          font-family: 'Lato';
          font-weight: 300;
          font-size: 15px;
          line-height: 18px;
          color: #949494;
        }
    }

    textarea{
      resize: vertical;
      background-color: #efefef;
      border: none;
      border-radius: 5px;
      padding-left: 10px;
      min-height: 66px;
      padding: 7px;
      outline-color: #151515;
      &::placeholder {
          font-family: 'Lato';
          font-weight: 300;
          font-size: 15px;
          line-height: 18px;
          color: #949494;
        }
    }

    button {
      width: 112px;
      height: 31px;
      position: absolute;
      right: 0;
      bottom: -35px;
      border: none;
      border-radius: 5px;
      background-color: #1877f2;
      color: white;
      cursor: pointer;
    }
  }
  @media (max-width: 600px) {
    p{
      text-align: center;
    }
  }
`;

export const LoadingStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  p {
    margin-top: 30px;
    color: white;
    font-family: 'Oswald';
    font-size: 24px;
    font-weight: 700;
    animation: ${pulseAnimation} 2s infinite;
  }
`;

export const EmptyStyle = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  p {
    margin-top: 30px;
    color: white;
    font-family: 'Oswald';
    font-size: 24px;
    font-weight: 700;
  }
`

