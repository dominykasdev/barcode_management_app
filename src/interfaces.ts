export interface IDataContext {
  barcodeArray: string[] | null;
  setBarcodeArray: React.Dispatch<React.SetStateAction<string[] | null>>;
  openSnackBar: boolean;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  snackBarMessage: string;
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
}
