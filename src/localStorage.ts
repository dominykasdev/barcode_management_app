function addNewBarcode(barcodes: string[]) {
  window.localStorage.setItem("BARCODES", JSON.stringify(barcodes));
}

function getBarcodes() {
  const barcodes = window.localStorage.getItem("BARCODES");
  if (barcodes !== null) {
    console.log(barcodes);
    return JSON.parse(barcodes) as string[];
  } else return null;
}

export { addNewBarcode, getBarcodes };
