import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.user) {
      console.log("Login successful");
      localStorage.setItem("token", data.user);
      navigate("/dashboard");
    } else {
      console.log("Please check your username and password");
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center" }}>Login</h1>
      <form
        onSubmit={loginUser}
        style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}
      >
        <div
          className="input-group"
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "10px" }}
          />
        </div>
        <div
          className="input-group"
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px" }}
          />
        </div>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </form>
    </main>
  );
};

export default Login;
