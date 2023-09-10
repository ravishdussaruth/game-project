export function useTemplateString() {
  function template(firstNumber: number, symbol: string, secondNumber: number) {
    return `Evaluate ${firstNumber} ${symbol} ${secondNumber} ?`;
  }

  return {
    template
  };
}
