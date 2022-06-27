import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

export function ErrorSnackbar() {
  const [open, setOpen] = React.useState(true);
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const isOpen = error !== null;
  return (
    <Snackbar open={error !== null} autoHideDuration={2} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
}
