import React, { useState } from "react";
import { Button } from "@mui/material";

const AddUsersModal = ({ toggleOpen, setToggleOpen, setRowData }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        setRowData((prev) => [...prev, { name: name, username: username }]);
        setToggleOpen(false);
      }
    } catch (err) {}
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 2,
        display: toggleOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "400px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <h2
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "0",
            right: "40px",
          }}
          onClick={() => setToggleOpen(false)}
        >
          X
        </h2>
        <h1>Add Users Modal</h1>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={createUser}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="name" style={{ marginBottom: "10px" }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              style={{ padding: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="username" style={{ marginBottom: "10px" }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              style={{ padding: "10px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="password" style={{ marginBottom: "10px" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              style={{ padding: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            style={{ alignSelf: "center" }}
            variant="contained"
          >
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUsersModal;
