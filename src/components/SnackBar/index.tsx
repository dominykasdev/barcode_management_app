import React, { useContext } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import DataContext from "../../Contexts/DataContext";

const SnackBar = () => {
  const { openSnackBar, setOpenSnackBar, snackBarMessage } =
    useContext(DataContext);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity="success" variant="filled" onClose={handleClose}>
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
