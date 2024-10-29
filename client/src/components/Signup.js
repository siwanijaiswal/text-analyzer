import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Signup.css";
import { BACKEND } from "../App";

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  async function submit(e) {
    e.preventDefault();
    axios.post(`${BACKEND}/auth/signup`, {
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
      history("/login")
      alert(res.data.message)
      window.location.reload()
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <div className="signup">
      <h1 className="sign">Signup</h1>
      <div className="signup-details">
        <form onSubmit={submit}>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <input type="submit" onClick={submit} />
        </form>
      </div>

      <br />
      <p></p>
      <br />
      <Link to="/login">Login here</Link>
    </div>
  );
}

export default Signup;
