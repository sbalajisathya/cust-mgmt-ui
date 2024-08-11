import React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const AlertDialog = ({ openFlag, description }) => {
  return (
    <div>
      <Collapse in={openFlag}>
        <Alert sx={{ mb: 10 }}>{description}</Alert>
      </Collapse>
    </div>
  );
};

export default AlertDialog;
