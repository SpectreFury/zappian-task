import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ModalContext } from "./contexts/ModalContext";
import { TableContext } from "./contexts/TableContext";
import EditButtonRenderer from "./components/EditButtonRenderer";
import DeleteButtonRenderer from "./components/DeleteButtonRenderer";

function App() {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "name" },
    { field: "username" },
    {
      field: "Edit Button",
      cellRenderer: EditButtonRenderer,
    },
    { field: "Delete Button", cellRenderer: DeleteButtonRenderer },
  ]);
  return (
    <TableContext.Provider
      value={{ rowData, setRowData, columnDefs, setColumnDefs }}
    >
      <ModalContext.Provider
        value={{ toggleOpen, setToggleOpen, selectedRow, setSelectedRow }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ModalContext.Provider>
    </TableContext.Provider>
  );
}

export default App;
