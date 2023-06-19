import React, { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

const EditButtonRenderer = (props) => {
  const { setToggleOpen, setSelectedRow } = useContext(ModalContext);
  return (
    <Button
      onClick={() => {
        setToggleOpen(true);
        setSelectedRow(props.data.username);
      }}
    >
      <EditIcon />
    </Button>
  );
};

export default EditButtonRenderer;
