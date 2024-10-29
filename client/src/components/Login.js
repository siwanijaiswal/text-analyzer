import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../style/Login.css";
import { BACKEND } from "../App";

function Login() {

  const history = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault()
    axios.post(`${BACKEND}/auth/login`, {
      email: email,
      password: password
    }).then((res) => {
      console.log(res)
      localStorage.setItem('userId', res.data.id);
      history("/")
      alert(res.data.message)
      window.location.reload()
    }).catch((err) => {
      alert(err.response.data.message);
    })
  }


  return (
    <div className="login">
      <h1 className="log">Login</h1>
      <div className="login-details">
        <form action="POST">
          <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />

          <input type="submit" onClick={submit} />
        </form>
      </div>

      <br />
      <p>Don't have an account?</p>
      <br />
      <Link to="/signup"> Signup here</Link>

    </div>
  )
}
export default Login