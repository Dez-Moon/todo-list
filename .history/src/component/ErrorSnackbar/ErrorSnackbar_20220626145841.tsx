import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

export function ErrorSnackbar() {
  const [open, setOpen] = React.useState(true);
  let error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    error = null;
  };
  const isOpen = error !== null;
  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
}
