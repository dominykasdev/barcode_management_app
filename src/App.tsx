import { useEffect, useState } from "react";
import "./App.css";
import barcodesList from "./data/Barcodes.json";
import { getBarcodes } from "./localStorage";
import SnackBar from "./components/SnackBar";
import BarcodeForm from "./components/BarcodeForm";
import DataContext from "./Contexts/DataContext";
import BarcodeList from "./components/BarcodeList";
import { Container } from "@mui/material";

function App() {
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [barcodeArray, setBarcodeArray] = useState<string[] | null>(null);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  useEffect(() => {
    console.log(barcodeArray);
    if (barcodeArray == null) {
      const barcodesLocalStorage: string[] | null = getBarcodes();
      // load barcodes from JSON file if none found in local storage
      setBarcodeArray(
        barcodesLocalStorage == null
          ? barcodesList.barcodes
          : barcodesLocalStorage
      );
    }
  }, [barcodeArray]);

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          barcodeArray,
          setBarcodeArray,
          openSnackBar,
          setOpenSnackBar,
          snackBarMessage,
          setSnackBarMessage,
        }}
      >
        <Container
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            flexDirection: "row",
            margin: "auto",
          }}
        >
          {barcodeArray && <BarcodeForm />}
          <BarcodeList />
        </Container>

        <SnackBar />
      </DataContext.Provider>
    </div>
  );
}

export default App;
