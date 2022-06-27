import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Stack from "@mui/material/Stack";

export function ErrorSnackbar() {
  return (
    <Stack sx={{ width: "20%" }} spacing={2}>
      <Alert icon={false} severity='success'>
        This is a success alert — check it out!
      </Alert>
    </Stack>
  );
}
