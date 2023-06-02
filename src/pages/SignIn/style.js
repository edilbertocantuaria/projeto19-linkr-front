import styled from "styled-components"

export const ContainerSign = styled.main`
display: flex;

`


export const Right = styled.div`

display: flex;
align-items: center;
text-align: center;
background-color: #333333;
width: 40vw;
height: 100vh;
flex-direction: column;
justify-content: center;

  input {
    margin-top: 13px;
    background-color: #FFF;
    width: 429px;
    height: 65px;
    border: none;
    border-radius: 6px;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    padding-left: 17px;
    padding-bottom: 6px;
    outline: none;
    &::placeholder {
      color: #9F9F9F;
    }
  }
  button {
    
    margin-top: 13px;
    width: 430px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1877F2;
    border: none;
    border-radius: 6px;
    color: #FFF;
    font-family: 'Oswald', sans-serif;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 6px;
    cursor: pointer;
        }
  p {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #FFF;
    margin-top: 22px;
    text-decoration: underline;
    cursor: pointer;
    }

    form {
        display: flex;
        flex-direction: column;
      
      }
`