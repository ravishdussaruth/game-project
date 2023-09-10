export function useRandomNumbers() {
  function randomNumber(maxNumber: number): number {
    const random = Math.floor(Math.random() * maxNumber);

    return random > 0 ? random : randomNumber(maxNumber);
  }

  function generateNumberOtherThan(correctNumber: number, maxNumber: number): number {
    const random = randomNumber(maxNumber);

    if (random === correctNumber) {
      return generateNumberOtherThan(correctNumber, random);
    }

    return random;
  }

  return {
    randomNumber,
    generateNumberOtherThan
  };
}
