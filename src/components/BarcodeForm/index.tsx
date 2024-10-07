import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { addNewBarcode } from "../../localStorage";
import {
  validateFormat,
  validateISOCC,
  validateCheckDigit,
  checkForDuplicates,
} from "./BarcodeForm.validation";
import DataContext from "../../Contexts/DataContext";

const BarcodeForm = () => {
  const [barcode, setBarcode] = useState<string>("");
  const [validFormat, setValidFormat] = useState<boolean>(true);
  const [validISOCC, setValidISOCC] = useState<boolean>(true);
  const [validCheckDigit, setValidCheckDigit] = useState<boolean>(true);
  const [notDuplicate, setNotDuplicate] = useState<boolean>(true);
  const { barcodeArray, setBarcodeArray, setOpenSnackBar, setSnackBarMessage } =
    useContext(DataContext);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidFormat: boolean = validateFormat(barcode);
    setValidFormat(isValidFormat);

    const isValidISOCC: boolean = validateISOCC(barcode);
    setValidISOCC(isValidISOCC);

    const isValidCheckDigit = validateCheckDigit(barcode);
    setValidCheckDigit(isValidCheckDigit);

    const isNotDuplicate: boolean = checkForDuplicates(
      barcode,
      barcodeArray as string[]
    );
    setNotDuplicate(isNotDuplicate);

    // if all validation passes, save new barcode to local storage
    if (validFormat && isValidISOCC && isValidCheckDigit && isNotDuplicate) {
      let newBarcodeArray: string[] = barcodeArray as string[];
      newBarcodeArray.push(barcode);
      addNewBarcode(newBarcodeArray);
      setBarcodeArray(null);
      setBarcode("");
      setSnackBarMessage("Barcode saved successfully!");
      setOpenSnackBar(true);
    }
  }

  function validationMessage() {
    let message: string = "";
    if (!validFormat) {
      message = "Invalid barcode format.";
    } else if (!validISOCC) {
      message = "Invalid ISO country code.";
    } else if (!validCheckDigit) {
      message = "Invalid check digit.";
    } else if (!notDuplicate) {
      message = "This barcode already exists.";
    }
    return message.trim() === "" ? null : message;
  }

  return (
    <form
      style={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={onSubmit}
    >
      <TextField
        type="text"
        placeholder="Barcode"
        name="barcode"
        error={!validFormat || !validISOCC || !validCheckDigit || !notDuplicate}
        value={barcode}
        helperText={validationMessage()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setBarcode(e.currentTarget.value);
          //reset validation upon change
          setValidFormat(true);
          setValidISOCC(true);
          setValidCheckDigit(true);
          setNotDuplicate(true);
        }}
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        disabled={barcode.trim() === ""}
        sx={{ margin: "10px" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default BarcodeForm;
