/** 12. Значение арифметического выражения */

const getPostixFromInfix = (str) => {
  const opsStack = [];
  const numStack = [];
  let curPos = -1;
  let balance = 0;
  let curNumberStr = "";

  const opsUp = (highPriority) => {
    if (!opsStack.length) {
      return;
    }

    let opsStackCurPos = -1;
    while (
      opsStack.at(opsStackCurPos) !== undefined &&
      opsStack.at(opsStackCurPos) !== "(" &&
      opsStack.length
    ) {
      if (highPriority) {
        if (["*", "/"].includes(opsStack.at(opsStackCurPos))) {
          numStack.push(opsStack.pop());
        } else {
          opsStackCurPos--;
        }
      } else {
        numStack.push(opsStack.pop());
      }
    }
  };

  const isDigit = (symbol) => {
    return /\d/.test(symbol);
  };

  const addNumber = (isNegative = false) => {
    if (isNegative) {
      curPos++;
    }
    curNumberStr = str[curPos];
    if (!isDigit(curNumberStr)) {
      throw new Error("wrong reading number");
    }
    while (curPos < str.length && isDigit(str[++curPos])) {
      curNumberStr += str[curPos];
    }
    curPos--;
    const curNumber = parseInt(curNumberStr);
    numStack.push(curNumber * (isNegative ? -1 : 1));
  };

  const checkOperationAfterOpenedParenthesis = () => {
    if (str[curPos - 1] === "(") {
      throw new Error("wrong operation after opened parenthesis");
    }
  };

  while (++curPos < str.length) {
    switch (str[curPos]) {
      case "(":
        balance++;
        opsStack.push("(");
        break;
      case ")":
        balance--;
        if (balance < 0) {
          throw new Error("wrong parenthesis balance");
        }
        opsUp(true);
        opsUp();
        opsStack.pop();
        break;
      case "+":
        checkOperationAfterOpenedParenthesis();
        opsUp();
        opsStack.push(str[curPos]);
        break;
      case "-":
        if (str[curPos - 1] === "(" || !curPos) {
          addNumber(true);
        } else {
          opsUp();
          opsStack.push(str[curPos]);
        }
        break;
      case "*":
      case "/":
        checkOperationAfterOpenedParenthesis();
        opsUp(true);
        opsStack.push(str[curPos]);
        break;
      default:
        addNumber();
        break;
    }
  }
  if (balance) {
    throw new Error("wrong parenthesis balance");
  }
  opsUp();

  return numStack;
};

const isOnlyAllowedSymbols = (str) => {
  const onlyAllowedSymbolsRegExp = new RegExp(/^([\d\s+-/*\(\)])*$/);
  return onlyAllowedSymbolsRegExp.test(str);
};

const isNumbersHasNoSpacesBetween = (str) => {
  const numbersHasSpacesBetweenRegExp = new RegExp(/\d\s+\d/);
  return !numbersHasSpacesBetweenRegExp.test(str);
};

const evaluatePostfix = (stack) => {
  const resultStack = [];
  if (!stack.length) {
    throw new Error("empty postfix stack");
  }
  stack.forEach((pos) => {
    if (typeof pos === "number") {
      resultStack.push(pos);
      return;
    }
    const [b, a] = [resultStack.pop(), resultStack.pop()];
    if ([a, b].includes(undefined)) {
      throw new Error("undefined");
    }
    switch (pos) {
      case "+":
        resultStack.push(a + b);
        break;
      case "-":
        resultStack.push(a - b);
        break;
      case "*":
        resultStack.push(a * b);
        break;
      case "/":
        resultStack.push(a / b);
        break;
      default:
        break;
    }
  });
  return resultStack[0].toString() || false;
};

let getResult = (data) => {
  const expressionRaw = data[0].trim();

  const isInvalidPrecheck = [
    isOnlyAllowedSymbols,
    isNumbersHasNoSpacesBetween,
  ].find((check) => {
    const res = !check(expressionRaw);
    return res;
  });

  if (isInvalidPrecheck) {
    return "WRONG";
  }
  const expression = expressionRaw.replaceAll(" ", "");

  try {
    const postfixStack = getPostixFromInfix(expression);
    if (!postfixStack.length) {
      return "WRONG";
    }
    return evaluatePostfix(postfixStack).toString();
  } catch (e) {
    return "WRONG";
  }
};

const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result);
