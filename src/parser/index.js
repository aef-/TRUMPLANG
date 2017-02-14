import {getNextToken} from 'lexer';
import {tokens} from 'token';

const ORDER = {
  LOWEST: 1,
  EQUALS: 2,
  LESSGREATER: 3,
  SUM: 4,
  PRODUCT: 5,
  PREFIX: 6,
  CALL: 7
};

function parseLet(rootInput) {
  const {input: letInput, token: letToken} = getNextToken(rootInput);
  const {input: identityInput, token: identityToken} = getNextToken(letInput);
  const {input: eqInput, token: eqToken} = getNextToken(identityInput);
  const {input: valueInput, expression} = parseExpression(
    getNextToken(eqInput));
  const {input: endStatementInput} = getNextToken(valueInput);
  // syntax checks can go herrr
  return {
    statement: {
      token: letToken,
      name: identityToken,
      value: expression
    },
    input: endStatementInput
  }
};

function parseReturn(rootInput) {
  const {input: returnInput, token: returnToken} = getNextToken(rootInput);
  const {input: valueInput, expression} = parseExpression(
    getNextToken(returnInput));
  const {input: endStatementInput} = getNextToken(valueInput);

  return {
    statement: {
      token: returnToken,
      value: expression
    },
    input: endStatementInput
  }
}

const parseIdentifier = ({input, token}) =>
  ({expression: {token, value: token.value}, input})

const parseInteger = ({input, token}) => {
  return ({expression : {token, value: parseInt(token.value, 10)}, input})
}

function parseExpressionStatement(rootInput) {
  const {input, token} = getNextToken(rootInput)
  const {input: expressionInput, expression} = parseExpression({input, token}, ORDER.LOWEST);
  const {input: endExpressionInput} = getNextToken(expressionInput);

  return {
    statement: {
      token: token,
      expression
    },
    input: endExpressionInput
  }
};

function parsePrefixExpression({input, token}) {
  const {input: rightInput, expression} = parseExpression(getNextToken(input));

  return {
    expression: {
      operator: token.value, right: expression
    },
    input: rightInput
  };
}

function parseExpression({input, token}, precedence) {
  return parsePrefix({input, token});
}

function parsePrefix({input, token}) {
  switch(token.type) {
    case 'IDENT':
      return parseIdentifier({input, token});
    case 'INT':
      return parseInteger({input, token});
    case 'BANG':
    case 'MINUS':
      return parsePrefixExpression({input, token});
    default:
      return {input, token};
  }
}

export default function(rootInput) {
    const {input, token} = getNextToken(rootInput);
    switch(token.type) {
      case 'LET':
        return parseLet(rootInput);
      case 'RETURN':
        return parseReturn(rootInput);
      case 'IF':
        return;
      case 'EOF':
        return {statement: null, input: null};
      default:
        return parseExpressionStatement(rootInput);
  }
}
