import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAppErrorAC } from "../../state/app-reducer";
import { AppRootStateType } from "../../state/store";

export function ErrorSnackbar() {
  const [open, setOpen] = React.useState(true);
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC({ error: null }));
  };
  const isOpen = error !== null;
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
}
