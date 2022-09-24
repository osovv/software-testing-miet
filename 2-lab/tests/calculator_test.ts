import { test } from "uvu";
import * as assert from "uvu/assert";
import { Calculator, CalculatorPresenter } from "../src/calculator";
import { ERROR_MESSAGES } from "../src/config";
import { CalculatorViewMock } from "../src/mocks";

const calculator = new Calculator();
const calculatorView = new CalculatorViewMock();
const calculatorPresenter = new CalculatorPresenter(calculator, calculatorView);

const divideByZeroError = ERROR_MESSAGES["divide_by_zero"];
const firstArgumentIsNotANumberError =
  ERROR_MESSAGES["first_argument_is_not_a_number"];
const secondArgumentIsNotANumberError =
  ERROR_MESSAGES["second_argument_is_not_a_number"];

function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomNumber() {
  return generateRandomNumber(1, 10 ** 6);
}

test("sum", () => {
  test("first argument is not a number", () => {
    calculatorView.firstArgument = "abc";
    calculatorView.secondArgument = "5";
    calculatorPresenter.onPlusClicked();
    assert.is(calculatorView.error, firstArgumentIsNotANumberError);
  });

  test("second argument is not a number", () => {
    calculatorView.firstArgument = "5";
    calculatorView.secondArgument = "abc";
    calculatorPresenter.onPlusClicked();
    assert.is(calculatorView.error, secondArgumentIsNotANumberError);
  });

  test("success", () => {
    for (let i = 0; i < 100; i++) {
      const a = randomNumber();
      const b = randomNumber();
      calculatorView.firstArgument = a.toString();
      calculatorView.secondArgument = b.toString();
      calculatorPresenter.onPlusClicked();
      assert.is(calculatorView.result, a + b);
    }
  });

  test.run();
});

test("subtract", () => {
  test("first argument is not a number", () => {
    calculatorView.firstArgument = "abc";
    calculatorView.secondArgument = "5";
    calculatorPresenter.onMinusClicked();
    assert.is(calculatorView.error, firstArgumentIsNotANumberError);
  });

  test("second argument is not a number", () => {
    calculatorView.firstArgument = "5";
    calculatorView.secondArgument = "abc";
    calculatorPresenter.onMinusClicked();
    assert.is(calculatorView.error, secondArgumentIsNotANumberError);
  });

  test("success", () => {
    for (let i = 0; i < 100; i++) {
      const a = randomNumber();
      const b = randomNumber();
      calculatorView.firstArgument = a.toString();
      calculatorView.secondArgument = b.toString();
      calculatorPresenter.onMinusClicked();
      assert.is(calculatorView.result, a - b);
    }
  });

  test.run();
});

test("multiply", () => {
  test("first argument is not a number", () => {
    calculatorView.firstArgument = "abc";
    calculatorView.secondArgument = "5";
    calculatorPresenter.onMultiplyClicked();
    assert.is(calculatorView.error, firstArgumentIsNotANumberError);
  });

  test("second argument is not a number", () => {
    calculatorView.firstArgument = "5";
    calculatorView.secondArgument = "abc";
    calculatorPresenter.onMultiplyClicked();
    assert.is(calculatorView.error, secondArgumentIsNotANumberError);
  });

  test("success", () => {
    for (let i = 0; i < 100; i++) {
      const a = randomNumber();
      const b = randomNumber();
      calculatorView.firstArgument = a.toString();
      calculatorView.secondArgument = b.toString();
      calculatorPresenter.onMultiplyClicked();
      assert.is(calculatorView.result, a * b);
    }
  });

  test.run();
});

test("divide", () => {
  test("first argument is not a number", () => {
    calculatorView.firstArgument = "abc";
    calculatorView.secondArgument = "5";
    calculatorPresenter.onDivideClicked();
    assert.is(calculatorView.error, firstArgumentIsNotANumberError);
  });

  test("second argument is not a number", () => {
    calculatorView.firstArgument = "5";
    calculatorView.secondArgument = "abc";
    calculatorPresenter.onDivideClicked();
    assert.is(calculatorView.error, secondArgumentIsNotANumberError);
  });

  test("divide by zero", () => {
    calculatorView.firstArgument = "5";
    calculatorView.secondArgument = "0";
    assert.throws(
      calculatorPresenter.onDivideClicked,
      new RangeError(divideByZeroError)
    );
  });

  test("success", () => {
    for (let i = 0; i < 100; i++) {
      const a = randomNumber();
      const b = randomNumber();
      calculatorView.firstArgument = a.toString();
      calculatorView.secondArgument = b.toString();
      calculatorPresenter.onDivideClicked();
      assert.is(calculatorView.result, a / b);
    }
  });

  test.run();
});

test.run();
