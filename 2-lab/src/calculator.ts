import { ERROR_MESSAGES } from "./config";

interface ICalculator {
  /**
   * Calculates the sum of two numbers
   */
  sum(a: number, b: number): number;

  /**
   * Calculates the difference of two numbers a - b
   */
  subtract(a: number, b: number): number;

  /**
   * Вычисляет произведение двух чисел
   */
  multiply(a: number, b: number): number;

  /**
   * Calculates the ratio of the number a to the number b.
   * Must throw RangeError if |b| < 10e-8
   */
  divide(a: number, b: number): number;
}

interface ICalculatorPresenter {
  /**
   * Called by the form when the user presses the '+' button
   */
  onPlusClicked(): void;

  /**
   * Called by the form when the user presses the '-' button
   */
  onMinusClicked(): void;

  /**
   * Called by the form when the user presses the '*' button
   */
  onMultiplyClicked(): void;

  /**
   * Called by the form when the user presses the '/' button
   */
  onDivideClicked(): void;
}

interface ICalculatorView {
  /**
   * Displays the result of the calculation
   */
  printResult(result: number): void;

  /**
   * Shows an error, e.g. division by 0, empty arguments, etc.
   */
  displayError(message: string): void;

  /**
   * Returns the value entered in the first argument field
   */
  firstArgumentAsString(): string;

  /**
   * Returns the value entered in the second argument field
   */
  secondArgumentAsString(): string;
}

class Calculator implements Calculator {
  sum(a: number, b: number) {
    return a + b;
  }

  subtract(a: number, b: number) {
    return a - b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  divide(a: number, b: number) {
    if (Math.abs(b) <= 10 ** -8) {
      throw new RangeError(ERROR_MESSAGES["divide_by_zero"]);
    }

    return a / b;
  }
}

class CalculatorPresenter implements ICalculatorPresenter {
  calculator: ICalculator;
  view: ICalculatorView;

  constructor(calculator: ICalculator, view: ICalculatorView) {
    this.calculator = calculator;
    this.view = view;
  }

  getArguments(): number[] | undefined {
    const firstArgument = this.view.firstArgumentAsString();
    const secondArgument = this.view.secondArgumentAsString();

    const a = parseFloat(firstArgument);
    const b = parseFloat(secondArgument);

    if (Number.isNaN(a)) {
      this.view.displayError(ERROR_MESSAGES["first_argument_is_not_a_number"]);
      return;
    }

    if (Number.isNaN(b)) {
      this.view.displayError(ERROR_MESSAGES["second_argument_is_not_a_number"]);
      return;
    }

    return [a, b];
  }

  run(func: (a: number, b: number) => number): void {
    const args = this.getArguments();

    if (args === undefined) {
      return;
    }

    const [a, b] = args;

    const result = func(a, b);

    this.view.printResult(result);
  }

  onPlusClicked(): void {
    this.run(this.calculator.sum);
  }

  onMinusClicked(): void {
    this.run(this.calculator.subtract);
  }

  onMultiplyClicked(): void {
    this.run(this.calculator.multiply);
  }

  onDivideClicked(): void {
    this.run(this.calculator.divide);
  }
}

export {
  ICalculator,
  ICalculatorView,
  ICalculatorPresenter,
  Calculator,
  CalculatorPresenter,
};
