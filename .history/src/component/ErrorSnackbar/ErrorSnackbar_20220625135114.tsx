import React from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

function MyAlert(props: AlertProps) {
  return <Alert elevation={6} variant='filled' {...props} />;
}

export function ErrorSnackbar() {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <MyAlert onClose={handleClose} severity='error'>
        This is a success message!
      </MyAlert>
    </Snackbar>
  );
}
