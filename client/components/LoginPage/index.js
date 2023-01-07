import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../reducers/userReducer";
import loginService from "../../services/loginService";

import { initializeVaccine } from "../../reducers/vaccineReducer";
import userService from "../../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeVaccine());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.create({
      email,
      password,
    });

    dispatch(loginUser(user));

    setEmail("");
    setPassword("");
    navigate("/vaccines");
  };
  function toggleForm(form) {
    setActiveForm(form);
  }
  const handleSignUp = async (event) => {
    event.preventDefault();
    const user = await userService.create({
      email,
      name,
      password,
    });
    console.log(user);
    setEmail("");
    setName("");
    setPassword("");
    alert("New user created");
    toggleForm("login");
  };

  return (
    <div className="wrapper" style={{ width: "fit-content" }}>
      {activeForm === "login" ? (
        <div className="login-form">
          <h2 style={{ margin: 40 }}>Log In</h2>
          <form
            className="login"
            style={{ width: "30rem" }}
            onSubmit={handleLogin}
          >
            <h1>Welcome Back</h1>
            <label htmlFor="email">Email:</label>

            <input
              id="email"
              value={email}
              name="Email"
              placeholder="email"
              onChange={({ target }) => setEmail(target.value)}
            />
            <label htmlFor="password">Password:</label>

            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <button className="primary-button" type="submit">
              Sign In
            </button>
            <br />
            <button
              className="secondary-button"
              onClick={() => toggleForm("signup")}
            >
              Sign Up
            </button>
            <br />
          </form>
        </div>
      ) : (
        <div className="signup-form" style={{ width: "fit-content" }}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="name"
              value={name}
              name="Name"
              placeholder="name"
              onChange={({ target }) => setName(target.value)}
            />
            <label htmlFor="email">Email:</label>

            <input
              id="email"
              value={email}
              name="Email"
              placeholder="email"
              onChange={({ target }) => setEmail(target.value)}
            />
            <label htmlFor="password">Password:</label>

            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <button type="submit">Sign Up</button>
            <br />
            <button onClick={() => toggleForm("login")}>Log In</button>
            <br />
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
