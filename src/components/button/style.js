import styled from "styled-components";

export const Button = styled.button`
    width: 112px;
    height: 31px;
    background: ${(props) => (props.color ? "#fff" : "#1877f2")};
    border-radius: 5px;
    border: none;
    color: ${(props) => (props.color ? "#1877f2" : "#fff")};
    &:disabled {

    }
`