import ISOCCList from "../../../data/ISOCountryCodes.json";

// format should be 2 letters followed by 9 digits followed by 2 letters. Total of 13 characters
function validateFormat(barcode: string) {
  const barcodeRegex = new RegExp(/^[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}$/);
  return barcodeRegex.test(barcode);
}

// Last 2 letters of 13 character string should be ISO country code.
// These are compared to match from list on ISOCountryCode.json
function validateISOCC(barcode: string) {
  const ccList: string[] = ISOCCList.countryCodes;
  return !!ccList.find((cc) => cc === barcode.substring(11, 13));
}

// 9th digit should be number that passes check after S10 calculation applied
function validateCheckDigit(barcode: string) {
  const weights: number[] = [8, 6, 4, 2, 3, 5, 9, 7];
  let sum: number = 0;
  const digits: number[] = barcode
    .substring(2, 10)
    .split("")
    .map((digit: string) => Number.parseInt(digit));
  const checkDigit: number = Number.parseInt(barcode.substring(10, 11));

  for (let i = 0; i < 8; i++) {
    sum += digits[i] * weights[i];
  }

  let c: number = 11 - (sum % 11);

  if (c === 10) {
    c = 0;
  } else if (c === 11) {
    c = 5;
  }

  return c === checkDigit;
}

function checkForDuplicates(barcode: string, barcodeArray: string[]) {
  return !barcodeArray?.find((item: string) => item === barcode);
}

export {
  validateFormat,
  validateISOCC,
  validateCheckDigit,
  checkForDuplicates,
};
