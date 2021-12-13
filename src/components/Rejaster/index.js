import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const register = () => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/register`, {
      email: email,
      password: password,
      role:'61a732da694d3b6362ba9e97',
      username:username,
      
    });
    navigate(`/login`);
  };

  return (
    <div className="contain">
        <input
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <p>password must to contain at least 1 capital litter , small litter, symbole, and at least 6 characters</p>
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      
      <button onClick={register}>register</button>
    </div>
  );
}

export default Register;