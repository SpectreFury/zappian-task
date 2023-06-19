import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material/";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center" }}>Register</h1>
      <form
        onSubmit={registerUser}
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Sign Up
        </Button>
      </form>
    </main>
  );
};

export default Register;
