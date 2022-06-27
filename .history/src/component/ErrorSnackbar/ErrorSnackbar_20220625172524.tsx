import { Alert, Snackbar } from "@mui/material";
import React from "react";

export function ErrorSnackbar() {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        This is a success message!
      </Alert>
    </Snackbar>
  );
}
