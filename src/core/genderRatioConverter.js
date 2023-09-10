export const convertGenderRatioFromDecimal = (decimalValue) => {
  if (decimalValue === 0) {
    return { male: 100.0, female: 0.0 };
  }
  if (decimalValue < 254) {
    return { 
      male: 100-((100*(decimalValue-1))/253),
      female: (100*(decimalValue-1))/253
    };
  }
  if (decimalValue === 254) {
    return { male: 0.0, female: 100 };
  }
  return { male: 0.0, female: 0.0 };
};
