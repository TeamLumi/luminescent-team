export const convertGenderRatioFromDecimal = (decimalValue) => {
  if (decimalValue <= 0) {
    return { male: 100.0, female: 0.0 };
  }

  if (decimalValue <= 31) {
    return { male: 88.14, female: 11.86 };
  }

  if (decimalValue <= 63) {
    return { male: 75.5, female: 24.5 };
  }

  if (decimalValue <= 127) {
    return { male: 50.2, female: 49.8 };
  }

  if (decimalValue <= 191) {
    return { male: 24.9, female: 75.1 };
  }

  if (decimalValue <= 225) {
    return { male: 11.46, female: 88.54 };
  }

  if (decimalValue <= 254) {
    return { male: 0.0, female: 100 };
  }

  return { male: 0.0, female: 0.0 };
};
