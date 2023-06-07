import styled from "styled-components"
import { AiOutlineSearch } from 'react-icons/ai';
import { DebounceInput } from 'react-debounce-input';


export const HeaderCSSvariables = styled.div`
    --header-height: 72px;
    --user-search-bg: #E7E7E7;
`

export const StyledHeader = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    background-color: var(--strong-black);
    padding: 20px;
    z-index: 2;
`

export const StyledLogo = styled.h1`
    font-family: 'Passion One';
    font-size: 3rem;
    color: #FFFFFF;

    &:hover {
        cursor: pointer;
    }
`

export const StyledUserAside = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > img {
        width: 50px;
        height: 50px;
        border-radius: 25px;

        &:hover {
            cursor: pointer;
        }
    }
`



export const LogoutModal = styled.div`
    position: ${props => props.arrowWasClicked ? "absolute" : "static"};
    display: ${props => props.arrowWasClicked ? "flex" : "none"};
    align-items: center;
    right: 0;
    padding: 0 0 10px 20px ;
    width: 150px;
    height: 40px;
    background-color: var(--regular-black);
    border-radius: 0 0 0 10px;
    top: 0;
    opacity: 0;
    z-index: 4;

    > p {
        color: #FFFFFF;
        font-family: 'Lato';

        &:hover {
            cursor: pointer;
        }
    }
`

export const MobileSearcher = styled.div`
    display: none;

    @media (max-width: 475px) {
        display: block;
    }
`

export const UserSearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin: 20px auto;
  @media (max-width: 800px) {
      width: 40%;
  }
  @media (max-width: 400px) {
    width: 50%;
  }
`;

export const SearchIcon = styled(AiOutlineSearch)`
  color: #C6C6C6;
  z-index: 1;
  margin-right: 0px;
  margin-left: auto;
`

export const SearchInput = styled(DebounceInput)`
  position: absolute;
    width: 100%;
    padding: 8px;
    font-family: 'Lato';
    font-size: 16px;
    background: #FFFFFF;
    border: none;
    border-radius: 8px;
    margin: auto;
    &::placeholder {
      font-family: 'Lato';
      font-size: 16px;
      color: #C6C6C6;
    }
    &:focus{
      outline: none;
    }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  color: black;
  opacity: ${props => props.isOpen ? 1 : 0};
  max-height: ${props => props.isOpen ? '200px' : 0};
  transition: opacity 300ms ease, max-height 300ms ease;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  transition:  all 1s ease;
  cursor: pointer;

  div {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    font-family: 'Lato';
    font-size: 16px;
    color: #515151;
  }
  span:nth-child(3) {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #1877f2;
    margin-left: 5px;
  }
  &:hover {
    background-color: #BDBDBD;
  }
`;