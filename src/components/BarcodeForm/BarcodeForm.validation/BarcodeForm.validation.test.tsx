import {
  checkForDuplicates,
  validateCheckDigit,
  validateFormat,
  validateISOCC,
} from ".";
import barcodesJSON from "../../../data/Barcodes.json";

test("should validate format of string", () => {
  // format should be 2 letters followed by 9 digits followed by 2 letters. Total of 13 characters
  const workingBarcode: string = "EP622373592US";
  const tooShort: string = "EP6223592U";
  const tooLong: string = "EP622351412492US";
  const specialCharacter: string = "¬P622373592U!";
  const numbersOnly: string = "1234567891011";
  const lettersOnly: string = "abcdefghijklm";
  const specialCharacters2: string = "Æ♣622373592UÉ";
  const emptyString: string = "";

  expect(validateFormat(workingBarcode)).toBeTruthy();
  expect(validateFormat(tooShort)).toBeFalsy();
  expect(validateFormat(tooLong)).toBeFalsy();
  expect(validateFormat(specialCharacter)).toBeFalsy();
  expect(validateFormat(specialCharacters2)).toBeFalsy();
  expect(validateFormat(numbersOnly)).toBeFalsy();
  expect(validateFormat(lettersOnly)).toBeFalsy();
  expect(validateFormat(emptyString)).toBeFalsy();
});

test("should validate string for ISO country code", () => {
  // Last 2 letters of 13 character string should be ISO country code.
  // These are compared to match from list on ISOCountryCode.json
  const existingISOCC: string = "EP622373592US";
  const nonExistentISOCC: string = "EP622373592ZZ";
  const tooShort: string = "EP6223592U";
  const tooLong: string = "EP622351412492US";
  const specialCharacter: string = "EP622373592?!";
  const emptyString: string = "";

  expect(validateISOCC(existingISOCC)).toBeTruthy();
  expect(validateISOCC(nonExistentISOCC)).toBeFalsy();
  expect(validateISOCC(tooShort)).toBeFalsy();
  expect(validateISOCC(tooLong)).toBeFalsy();
  expect(validateISOCC(specialCharacter)).toBeFalsy();
  expect(validateISOCC(emptyString)).toBeFalsy();
});

test("should validate string check digit", () => {
  // 9th digit should be number that passes check after S10 calculation applied
  const workingDigit: string = "EP622373592US";
  const workingDigitNumber0: string = "EM112397940SE";
  const workingDigitNumber5: string = "EU584344275US";
  const notWorkingDigit: string = "EP622373590US";
  const notWorkingDigit2: string = "EP111111112US";
  const tooShort: string = "EP6223592U";
  const tooLong: string = "EP622351412492US";
  const specialCharacter: string = "EP622373592?!";
  const specialCharacter2: string = "EP62237359£US";
  const emptyString: string = "";

  expect(validateCheckDigit(workingDigit)).toBeTruthy();
  expect(validateCheckDigit(workingDigitNumber0)).toBeTruthy();
  expect(validateCheckDigit(workingDigitNumber5)).toBeTruthy();
  expect(validateCheckDigit(notWorkingDigit)).toBeFalsy();
  expect(validateCheckDigit(notWorkingDigit2)).toBeFalsy();
  expect(validateCheckDigit(tooShort)).toBeFalsy();
  expect(validateCheckDigit(tooLong)).toBeFalsy();
  expect(validateCheckDigit(specialCharacter)).toBeTruthy(); // special character applied to letters not affected
  expect(validateCheckDigit(specialCharacter2)).toBeFalsy();
  expect(validateCheckDigit(emptyString)).toBeFalsy();
});

test("should validate string for duplicates", () => {
  // checks string for duplicates
  const existingBarcode: string = "EP622373592US";
  const nonExistingBarcode: string = "EM112397940SE";

  expect(
    checkForDuplicates(existingBarcode, barcodesJSON.barcodes)
  ).toBeFalsy();
  expect(
    checkForDuplicates(nonExistingBarcode, barcodesJSON.barcodes)
  ).toBeTruthy();
});
