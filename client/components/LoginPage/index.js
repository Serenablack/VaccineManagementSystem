import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../reducers/userReducer";
import loginService from "../../services/loginService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const user = await loginService.create({
      email,
      password,
    });
    if (user) {
      dispatch(loginUser(user));
    }
    setEmail("");
    setPassword("");
    navigate("/");
  };
  return (
    <div>
      <div>
        <form className="login" onSubmit={handleLogin}>
          <div className="input">
            <input
              id="email"
              value={email}
              name="Email"
              placeholder="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="input">
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit" className="button">
            Submit
          </button>
          <br />
          <div>
            No account yet?
            <Link to="/register" className="text-link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
