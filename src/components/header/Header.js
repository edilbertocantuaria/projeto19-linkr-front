import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import UserContext1 from "../../contexts/use.context.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const avatarFromLocalStorage = localStorage.getItem("image");
    const nameFromLocalStorage = localStorage.getItem("username")
    setAvatar(avatarFromLocalStorage);
    setName(nameFromLocalStorage)

  }, []);
  

  const { user } = useContext(UserContext1);
  


  const navigate = useNavigate();

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    console.log("aqq")
    console.log(token);
    console.log(localStorage);
    console.log(avatar)


    if (token) {
      const confirmLogout = window.confirm("Deseja sair da conta?");

      if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.clear();
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  };

  return (
    <HeaderContainer>
      <Logo>linkr</Logo>
      { (
        <UserContainer>
          <UserName>{name}</UserName>
          <UserImage
            src={avatar}
            alt="perfil"
            onClick={handleUserClick}
          />
          <FiChevronDown />
        </UserContainer>
      )}
    </HeaderContainer>
  );
}


const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  background-color: #151515;
  padding: 0 20px;
  color: white;
`;

const Logo = styled.h2`
  font-family: 'Passion One';
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;
`;

const UserName = styled.p`
  margin-right: 10px;
  font-family: 'Oswald';
  font-weight: 400;
  font-size: 16px;
  line-height: 64px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;