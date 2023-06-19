import React, { useContext } from "react";
import { TableContext } from "../contexts/TableContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const DeleteButtonRenderer = (props) => {
  const { setRowData } = useContext(TableContext);
  const deleteUser = async () => {
    const response = await fetch("http://localhost:4000/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.data.username,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      setRowData((prev) => {
        return prev.filter((data) => data.username !== props.data.username);
      });
    }
  };

  return (
    <Button type="submit" onClick={deleteUser}>
      <DeleteIcon />
    </Button>
  );
};
export default DeleteButtonRenderer;
