import { ICalculatorView } from "./calculator";

class CalculatorViewMock implements ICalculatorView {
  result: number;
  error: string;
  firstArgument: string;
  secondArgument: string;

  printResult(result: number): void {
    this.result = result;
  }
  displayError(message: string): void {
    this.error = message;
  }

  firstArgumentAsString(): string {
    return this.firstArgument;
  }

  secondArgumentAsString(): string {
    return this.secondArgument;
  }
}

export { CalculatorViewMock };
