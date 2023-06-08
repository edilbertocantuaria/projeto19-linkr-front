import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { Dropdown, SearchIcon, SearchInput, UserItem, UserSearchContainer } from './style';

export default function UserSearch() {

  const navigate = useNavigate()

  const [usersInfo, setUsersInfo] = useState([])
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userIdLocalStorage = localStorage.getItem('userId')

  useEffect(() => {
      async function getUsers() {
          try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/followers/${userIdLocalStorage}`);
              const options = [];
              response.data.followers.forEach(f => {
                const follower = response.data.users.find(u => u.id === f.followedId);
                if (follower) {
                  const user = {id: follower.id, name: follower.username, image: follower.image, follower: true};
                  options.push(user);
                }
              })
              response.data.users.forEach(u => {
                if(!response.data.followers.find(f => u.id === f.followedId)) {
                  const user = {id: u.id, name: u.username, image: u.image, follower: false};
                  options.push(user);
                }
              })
              setUsersInfo(options)
          } catch (err) {
              console.log(err);
          }
      }
      getUsers();
  }, [value]);

  function handleSearchChange(e) {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);

    if (value.length >= 3) {
        searchUsers(value);
    } else {
        setIsDropdownOpen(false);
        setTimeout(() => {
            setResults([]);
        }, 300)
    }
  };

  function searchUsers(value) {
    const filteredResults = usersInfo.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase())
    );
    if (filteredResults.length === 0) {
      setIsDropdownOpen(false);
        setTimeout(() => {
            setResults(filteredResults);
        }, 300)
    } else {
      setResults(filteredResults);
      setTimeout(() => {
        setIsDropdownOpen(true);
      }, 300)
    }
    
  };

  async function getUserPage(username) {
    try {
        const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
        const user = users.data.find(u => u.username === username);
        setValue('');
        setResults([]);
        navigate(`/user/${user.id}`);
    } catch (err) {
        console.log(err)
        alert(err.response.data.message);
    }
  };

  return (
    <UserSearchContainer>
      <SearchIcon size={20} style={{ marginRight: '5px' }} />
      <SearchInput
        debounceTimeout={300}
        value={value}
        onChange={handleSearchChange}
        placeholder="Search for people"
        onFocus={() => {
          if (value !== '') {
            searchUsers(value)
          }}}
        onBlur={() => {
          setIsDropdownOpen(false);
          setTimeout(() => {
              setResults([]);
          }, 300)
        }}
        data-test="search"
      />

      {results.length > 0 && (
        <Dropdown isOpen={isDropdownOpen}>
          {results.map((user) => (
            <UserItem key={user.id} 
            onClick={() => getUserPage(user.name)}
            data-test="user-search"
            >
              <div style={{backgroundImage: `url(${user.image})`}} alt={user.name}></div>
              <span>{user.name.slice(0,10)}</span>
              {user.follower ? <span>• following</span> : <></>}
            </UserItem>
          ))}
        </Dropdown>
      )}
    </UserSearchContainer>
  );
};