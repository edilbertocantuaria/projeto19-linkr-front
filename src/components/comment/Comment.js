import styled from "styled-components"

export default function Comment(props) {
  const userId = localStorage.getItem("userId");

    return (
        <>
            <ComContainer data-test="comment" >
                <UserContainer>
                    <UserImage
                        src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
                        style={{ backgroundImage: `url(${props.img})` }}
                        alt="userImage"
                    />
                    <AuxComContainer>
                      <div>
                      <p>{props.username}</p>
                      {userId===props.userId?<span>   post's author</span>:""}
                      </div>
                        <span>{props.text}</span>
                    </AuxComContainer>
                </UserContainer>
            </ComContainer>
            <Hr />
        </>
    )
}

const ComContainer = styled.div`
    padding: 15px 0px;
    height: 68px;
    width: 100%;
`

const AuxComContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
font-size: 14px;
line-height: 17px;
width: 100%;
  p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    color: white;
    margin-bottom: 3px;
  }
  span{
    color: #acacac;
  }
  div{
    display: flex;
  }
`
const Hr = styled.hr`
  border: 1px solid #484848;  
`;

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 18px;
    transition:  all 300ms ease;
    background-size: cover;
    background-position: center center;
    &:hover{
      cursor: pointer;
      filter: brightness(70%);
    }
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`