import Banner from "../../components/banner/banner.js";
import { Right, ContainerSign } from "../SignIn/style.js";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [isClicked, setIsClicked] = useState(false)


  const navigate = useNavigate()


  async function register(e) {
    e.preventDefault()

    if (!email || !password || !username || !image) return alert("Campos Obrigatórios não preenchidos!")

    const URL = `${process.env.REACT_APP_API_URL}/signup`
    const body = { email, password, username, image }
    setIsClicked(true)

    try {
      await axios.post(URL, body)
      navigate('/')
    } catch (err) {
      alert(err.response.data)
    } finally {
      setIsClicked(false)
    }
  }

  return (
    <ContainerSign>
      <Banner />
      <Right>
        <form onSubmit={register}>
          <input
            placeholder="e-mail"
            data-test="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isClicked}

          />
          <input
            placeholder="password"
            data-test="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isClicked}

          />
          <input
            placeholder="username"
            data-test="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isClicked}

          />
          <input
            placeholder="picture perfil url"
            type="url"
            value={image}
            autoComplete="on"
            onChange={(e) => setImage(e.target.value)}
            disabled={isClicked}
          />
          <button type="submit" disabled={isClicked} data-test="sign-up-btn">Sign Up</button>
        </form>
        <p data-test="login-link" onClick={() => navigate('/')}>Switch back to log in</p>
      </Right>
    </ContainerSign>
  )
}