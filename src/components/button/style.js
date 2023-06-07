import styled from "styled-components";

export const Button = styled.button`
    margin-top: 90px;
    margin-right: -110px;
    width: 112px;
    height: 31px;
    background: ${(props) => (props.color ? "#fff" : "#1877f2")};
    border-radius: 5px;
    border: none;
    color: ${(props) => (props.color ? "#1877f2" : "#fff")};
    display: ${(props)=> (props.isUser ? "none" : "block")}
`