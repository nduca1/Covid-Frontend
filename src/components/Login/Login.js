import React, { useState, useEffect } from "react";
import axios from "axios";

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";
import useIsEmail from "../hooks/useIsEmail";
import "./Login.css";

function Login({ setUser }) {
  const [, , checkToken] = useAuthHooks();

  const navigate = useNavigate();

  const [
    email,
    setEmail,
    errorEmail,
    setEmailOnBlur,
    setEmailOnFocus,
  ] = useIsEmail();

  const [
    password,
    setPassword,
    errorPassword,
    setPasswordOnBlur,
    setPasswordOnFocus,
  ] = useState("");

  useEffect(() => {
    if (checkToken()) {
      navigate("/covid");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let url =
        process.env.NODE_ENV === "production"
          ? "https://covid-tracker-backend-nick.herokuapp.com"
          : "http://localhost:3001";
      let payload = await axios.post(url + "/api/user/sign-in", {
        email,
        password,
      });

      const jwtToken = payload.data.payload;
      window.localStorage.setItem("jwtToken", jwtToken);
      const decodedToken = jwtDecode(jwtToken);

      setUser({
        isAuth: true,
        username: decodedToken.data.username,
        email: decodedToken.data.email,
      });
      toast.success("Congrats! You logged In");
      setEmail("");
      setPassword("");

      navigate("/covid");
    } catch (e) {
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div>
        <h1>Login</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={() => setEmailOnBlur(true)}
            onFocus={() => setEmailOnFocus(true)}
            required
          />
          <div className={`${errorEmail ? "form-error" : undefined}`}>
            <span>{errorEmail && "Please enter a valid email"} </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onBlur={() => setPasswordOnBlur(true)}
            onFocus={() => setPasswordOnFocus(true)}
            required
          />
          <div className={`${errorPassword ? "form-error" : undefined}`}>
            <span>{errorPassword && "Please enter a valid password"} </span>
          </div>
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Login;
