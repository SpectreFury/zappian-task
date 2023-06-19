import React, { useState, useEffect, useContext } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import EditModal from "./EditModal";
import { ModalContext } from "../contexts/ModalContext";
import AddUsersModal from "./AddUsersModal";
import { TableContext } from "../contexts/TableContext";
import { Button } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const { toggleOpen, setToggleOpen } = useContext(ModalContext);
  const { rowData, setRowData, columnDefs, setColumnDefs } =
    useContext(TableContext);
  const [toggleUsersModal, setToggleUsersModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const populateUsers = async () => {
      const response = await fetch("http://localhost:4000/getUsers");
      const data = await response.json();

      setRowData(data);
    };

    populateUsers();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EditModal toggleOpen={toggleOpen} setToggleOpen={setToggleOpen} />
      <AddUsersModal
        toggleOpen={toggleUsersModal}
        setToggleOpen={setToggleUsersModal}
        setRowData={setRowData}
      />
      <h1>Zappian Task</h1>
      <div
        className="ag-theme-alpine"
        style={{ width: "800px", height: "400px" }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
      <Button
        style={{ marginTop: "20px" }}
        onClick={() => setToggleUsersModal(true)}
        variant="contained"
      >
        Add User
      </Button>
    </main>
  );
};

export default Dashboard;
