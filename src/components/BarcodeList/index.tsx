import React, { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

const BarcodeList = () => {
  const { barcodeArray } = useContext(DataContext);

  return (
    <ul style={{ listStyle: "none" }}>
      <li>Existing Barcodes:</li>
      {barcodeArray &&
        barcodeArray.map((bc, index) => <li key={index}>{bc}</li>)}
    </ul>
  );
};

export default BarcodeList;
