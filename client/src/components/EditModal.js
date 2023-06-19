import React, { useState, useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { TableContext } from "../contexts/TableContext";
import { Button } from "@mui/material";

const EditModal = ({ toggleOpen, setToggleOpen }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { selectedRow } = useContext(ModalContext);
  const { setRowData } = useContext(TableContext);

  const updateUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        prevUsername: selectedRow,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      setToggleOpen(false);
      setRowData((prev) => {
        return prev.map((row) => {
          if (row.username === selectedRow) {
            return { ...row, name: name, username: username };
          } else {
            return row;
          }
        });
        // const spliceIndex = prev.find((row) => row.username === selectedRow);
        // const filteredRows = prev.filter((row) => row.username !== selectedRow);

        // filteredRows.splice(spliceIndex, 0, { name: name, username: username });

        // return filteredRows;
      });
    }
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
        <h1>Edit Modal</h1>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={updateUser}
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
          <Button
            type="submit"
            style={{ alignSelf: "center" }}
            variant="contained"
          >
            Edit User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
