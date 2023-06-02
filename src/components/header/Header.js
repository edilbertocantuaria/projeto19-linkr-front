import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [arrowRotated, setArrowRotated] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const avatarFromLocalStorage = localStorage.getItem("image");
    const nameFromLocalStorage = localStorage.getItem("username");
    setAvatar(avatarFromLocalStorage);
    setName(nameFromLocalStorage);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
      {(
        <UserContainer>
          <UserName>{name}</UserName>
          <UserImage
            src={avatar}
            alt="perfil"
            data-test="avatar"
            className={arrowRotated ? "rotated" : ""}
            onClick={() => {
              setShowMenu(!showMenu);
              setArrowRotated(!arrowRotated);
            }}
          />
          <ArrowIcon
            className={arrowRotated ? "rotated" : ""}
            onClick={() => {
              setShowMenu(!showMenu);
              setArrowRotated(!arrowRotated);
            }}
          />
          {showMenu && (
            <MenuContainer ref={menuRef} data-test="menu">
              <MenuItem onClick={handleLogout} data-test="logout" >Logout</MenuItem>
            </MenuContainer>
          )}
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
  font-family: "Passion One";
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;
`;

const UserName = styled.p`
  margin-right: 10px;
  font-family: "Oswald";
  font-weight: 400;
  font-size: 16px;
  line-height: 64px;
`;

const UserImage = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
 
  img{
    cursor: pointer;

  }
`;

const ArrowIcon = styled(FiChevronDown)`
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &.rotated {
    transform: rotate(180deg);
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #000;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const MenuItem = styled.div`
  cursor: pointer;
`;