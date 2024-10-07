import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";
import { Container } from "@mui/material";
import "./BarcodeList.css";

const BarcodeList = () => {
  const { barcodeArray } = useContext(DataContext);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
      }}
    >
      <ul style={{ listStyle: "none" }} className="barcodeList">
        <li>
          <b>Existing Barcodes:</b>
        </li>
        {barcodeArray &&
          barcodeArray.map((bc, index) => (
            <li className="barcodeItem" key={index}>
              {bc}
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default BarcodeList;
