import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch";
import linkrIcon from "../../assets/linkrIcon.png"

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
      <LogoIcon src={linkrIcon} alt='linkrIcon' />
      <UserSearch/>
      {(
        <UserContainer>
          <UserName>{name}</UserName>
          <UserImage
            src="https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/totalmente-transparente-png-fw.png?fit=696%2C392&ssl=1"
            style={{backgroundImage: `url(${avatar})`}}
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
  position: fixed;
  top:0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 72px;
  background-color: #151515;
  padding: 0 20px;
  color: white;
  justify-content: space-between;
  z-index: 2;
`;

const Logo = styled.h2`
  font-family: "Passion One";
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  display: block;
  cursor: pointer;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LogoIcon = styled.img`
  display: none;
  @media (max-width: 600px) {
    width: 13%;
    display: inline-block;
  }
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.span`
  margin-right: 10px;
  font-family: "Oswald";
  font-weight: 400;
  font-size: 16px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const UserImage = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  background-size: cover;
  background-position: center center;
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