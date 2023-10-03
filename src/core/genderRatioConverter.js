export const convertGenderRatioFromDecimal = (decimalValue) => {
  if (decimalValue === 0) {
    return { male: 100.0, female: 0.0 };
  }
  if (decimalValue < 254) {
    const firstStep = decimalValue-1;
    const secondStep = 100*firstStep;
    const thirdStep = secondStep/253;
    const female = parseFloat(thirdStep.toFixed(2));
    const finalStep = 100-female;
    const male = parseFloat(finalStep.toFixed(2));
    return {
      male: male,
      female: female
    };
  }
  if (decimalValue === 254) {
    return { male: 0.0, female: 100 };
  }
  return { male: 0.0, female: 0.0 };
};
