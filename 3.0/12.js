/** 12. Значение арифметического выражения */

const OPERATORS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
  OPEN_PAREN: "(",
  CLOSE_PAREN: ")",
};

const HIGH_PRIORITY_OPS = [OPERATORS.MULTIPLY, OPERATORS.DIVIDE];
const LOW_PRIORITY_OPS = [OPERATORS.ADD, OPERATORS.SUBTRACT];
const ALL_OPERATORS = [...HIGH_PRIORITY_OPS, ...LOW_PRIORITY_OPS];

const ERROR_MESSAGES = {
  WRONG_NUMBER: "wrong reading number",
  WRONG_PARENTHESIS: "wrong parenthesis balance",
  WRONG_OPERATION: "wrong operation after opened parenthesis",
  EMPTY_STACK: "empty postfix stack",
  UNDEFINED_OPERAND: "undefined operand",
};

const isDigit = (symbol) => /\d/.test(symbol);

const isOnlyAllowedSymbols = (str) => {
  const allowedSymbolsRegex = /^[\d\s+\-/*()]*$/;
  return allowedSymbolsRegex.test(str);
};

const hasSpacesBetweenNumbers = (str) => {
  const spacesBetweenNumbersRegex = /\d\s+\d/;
  return spacesBetweenNumbersRegex.test(str);
};

class PostfixConverter {
  constructor(expression) {
    this.expression = expression;
    this.operatorStack = [];
    this.outputQueue = [];
    this.currentPosition = -1;
    this.parenthesesBalance = 0;
  }

  convert() {
    while (++this.currentPosition < this.expression.length) {
      const currentChar = this.expression[this.currentPosition];

      if (isDigit(currentChar)) {
        this.processNumber();
      } else if (currentChar === OPERATORS.OPEN_PAREN) {
        this.processOpenParenthesis();
      } else if (currentChar === OPERATORS.CLOSE_PAREN) {
        this.processCloseParenthesis();
      } else if (ALL_OPERATORS.includes(currentChar)) {
        this.processOperator(currentChar);
      }
    }

    this.validateParenthesesBalance();
    this.popRemainingOperators();

    return this.outputQueue;
  }

  processNumber(isNegative = false) {
    if (isNegative) {
      this.currentPosition++;
    }

    let numberString = this.expression[this.currentPosition];

    if (!isDigit(numberString)) {
      throw new Error(ERROR_MESSAGES.WRONG_NUMBER);
    }

    while (
      this.currentPosition + 1 < this.expression.length &&
      isDigit(this.expression[this.currentPosition + 1])
    ) {
      numberString += this.expression[++this.currentPosition];
    }

    const number = parseInt(numberString) * (isNegative ? -1 : 1);
    this.outputQueue.push(number);
  }

  processOpenParenthesis() {
    this.parenthesesBalance++;
    this.operatorStack.push(OPERATORS.OPEN_PAREN);
  }

  processCloseParenthesis() {
    this.parenthesesBalance--;

    if (this.parenthesesBalance < 0) {
      throw new Error(ERROR_MESSAGES.WRONG_PARENTHESIS);
    }

    this.popOperatorsUntilOpenParenthesis();
    this.operatorStack.pop();
  }

  processOperator(operator) {
    if (operator === OPERATORS.SUBTRACT && this.isUnaryMinus()) {
      this.processNumber(true);
      return;
    }

    this.validateOperatorPosition();
    this.popOperatorsByPriority(operator);
    this.operatorStack.push(operator);
  }

  isUnaryMinus() {
    const prevChar = this.expression[this.currentPosition - 1];
    return prevChar === OPERATORS.OPEN_PAREN || this.currentPosition === 0;
  }

  validateOperatorPosition() {
    const prevChar = this.expression[this.currentPosition - 1];
    if (prevChar === OPERATORS.OPEN_PAREN) {
      throw new Error(ERROR_MESSAGES.WRONG_OPERATION);
    }
  }

  popOperatorsByPriority(currentOperator) {
    const isHighPriority = HIGH_PRIORITY_OPS.includes(currentOperator);

    while (this.operatorStack.length > 0) {
      const topOperator = this.operatorStack[this.operatorStack.length - 1];

      if (topOperator === OPERATORS.OPEN_PAREN) {
        break;
      }

      if (isHighPriority && !HIGH_PRIORITY_OPS.includes(topOperator)) {
        break;
      }

      this.outputQueue.push(this.operatorStack.pop());
    }
  }

  popOperatorsUntilOpenParenthesis() {
    while (this.operatorStack.length > 0) {
      const topOperator = this.operatorStack[this.operatorStack.length - 1];

      if (topOperator === OPERATORS.OPEN_PAREN) {
        break;
      }

      this.outputQueue.push(this.operatorStack.pop());
    }
  }

  popRemainingOperators() {
    while (this.operatorStack.length > 0) {
      this.outputQueue.push(this.operatorStack.pop());
    }
  }

  validateParenthesesBalance() {
    if (this.parenthesesBalance !== 0) {
      throw new Error(ERROR_MESSAGES.WRONG_PARENTHESIS);
    }
  }
}

class PostfixEvaluator {
  constructor(postfixExpression) {
    this.postfixExpression = postfixExpression;
    this.stack = [];
  }

  evaluate() {
    if (!this.postfixExpression.length) {
      throw new Error(ERROR_MESSAGES.EMPTY_STACK);
    }

    for (const token of this.postfixExpression) {
      if (typeof token === "number") {
        this.stack.push(token);
      } else {
        this.processOperator(token);
      }
    }

    return this.stack[0];
  }

  processOperator(operator) {
    const operand2 = this.stack.pop();
    const operand1 = this.stack.pop();

    if (operand1 === undefined || operand2 === undefined) {
      throw new Error(ERROR_MESSAGES.UNDEFINED_OPERAND);
    }

    const result = this.calculateOperation(operand1, operand2, operator);
    this.stack.push(result);
  }

  calculateOperation(operand1, operand2, operator) {
    switch (operator) {
      case OPERATORS.ADD:
        return operand1 + operand2;
      case OPERATORS.SUBTRACT:
        return operand1 - operand2;
      case OPERATORS.MULTIPLY:
        return operand1 * operand2;
      case OPERATORS.DIVIDE:
        return operand1 / operand2;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
}

const calculateExpression = (expressionString) => {
  const trimmedExpression = expressionString.trim();

  if (!isOnlyAllowedSymbols(trimmedExpression)) {
    return "WRONG";
  }

  if (hasSpacesBetweenNumbers(trimmedExpression)) {
    return "WRONG";
  }

  const cleanExpression = trimmedExpression.replace(/\s/g, "");

  try {
    const converter = new PostfixConverter(cleanExpression);
    const postfixExpression = converter.convert();

    if (!postfixExpression.length) {
      return "WRONG";
    }

    const evaluator = new PostfixEvaluator(postfixExpression);
    const result = evaluator.evaluate();

    return result.toString();
  } catch (error) {
    return "WRONG";
  }
};

const processInput = (inputData) => {
  const expression = inputData[0];
  return calculateExpression(expression);
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputData = [];

rl.on("line", (line) => {
  inputData.push(line.trim());
});

rl.on("close", () => {
  const result = processInput(inputData);
  console.log(result);
});
