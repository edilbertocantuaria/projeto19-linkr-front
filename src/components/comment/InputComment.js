import styled from "styled-components"
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
export default function InputComment(props) {
    const [text, setText] = useState()
    function input(e) {
        e.preventDefault()
        setText(e.target.value)
        console.log("comment", e.target.value)
    }
    const img = localStorage.getItem("image");
    const username = localStorage.getItem("username");

    function addComment() {
        console.log("postId",props.postId)
        console.log("commentSub",text)

        axios.post(`${process.env.REACT_APP_API_URL}/comments/${props.postId}`, {
            "comment": text,
            "img": img,
            "username":username
        })
            .then(res => {
                console.log(`comentario enviado com sucesso`)
            })
            .catch(err => console.log(err.message))
            setText("")
            console.log("antes",props.loadComments)

            props.setLoadComments(!props.loadComments)
            console.log("dps",props.loadComments)
    }

    return (
        <Container>
            <UserImage
                src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
                style={{ backgroundImage: `url(${img})` }}
                alt="userImage"
            />
            <CommInput placeholder="write a comment..." onChange={e => input(e)} value={text}/>
            <FiSend
                size="15px"
                color="white"
                onClick={() => addComment()} />
        </Container>
    )
}
const CommInput = styled.input`
    width: 90%;
    height: 39px;
    border: none;
    border-radius: 8px;
    background-color: #252525;
    padding: 15px;
    color: #acacac;
    &::placeholder{
        color: #575757;
    }
    &:focus {
        outline: none;
}
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-top: 19px;

`

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