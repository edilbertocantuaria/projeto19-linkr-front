import styled from "styled-components"


export const Left = styled.div`
width: 100vw;
height: 100vh;
background-color: #151515;
color: #FFF;
padding-top: 300px;
padding-left: 140px;
padding-right: 30px;
h1 {
  font-family: 'Passion One', cursive;
  font-size: 106px;
  font-weight: 700;
}
p {
  font-family: 'Oswald', sans-serif;
  font-size: 43px;
  font-weight: 700;
}


    @media (max-width:900px) {
        padding: 300px 20px 0 20px;
      }
      @media (max-width: 725px) {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding-left: 0;
        padding-top: 0;
        padding-bottom: 17px;
        h1 {
          font-size: 76px;
          margin-top: 10px;
        }
        p {
          font-size: 23px;
          margin-bottom: 10px;
        }
      }

`