import {tokens, keywords, keywordToType} from 'token';

const LETTER_REGEX = /[A-Z_]/i;
const DIGIT_REGEX = /[0-9]/;

export function getToken(input) {
  const {char} = input;
  const nextInput = readChar(input);

  switch(input.char) {
    case tokens.ASSIGN:
      if (nextInput.char === '=') {
        const char = `${input.char + nextInput.char}`;
        return {token: {type: 'EQ', value: char}, input: readChar(nextInput)};
      } else {
        return {token: {type: 'ASSIGN', value: char}, input: readChar(input)};
      }
    case tokens.SEMICOLON:
      return {token: {type: 'SEMICOLON', value: char}, input: readChar(input)};
    case tokens.LPAREN:
      return {token: {type: 'LPAREN', value: char}, input: readChar(input)};
    case tokens.RPAREN:
      return {token: {type: 'RPAREN', value: char}, input: readChar(input)};
    case tokens.COMMA:
      return {token: {type: 'COMMA', value: char}, input: readChar(input)};
    case tokens.PLUS:
      return {token: {type: 'PLUS', value: char}, input: readChar(input)};
    case tokens.LBRACE:
      return {token: {type: 'LBRACE', value: char}, input: readChar(input)};
    case tokens.RBRACE:
      return {token: {type: 'RBRACE', value: char}, input: readChar(input)};
    case tokens.MINUS:
      return {token: {type: 'MINUS', value: char}, input: readChar(input)};
    case tokens.GT:
      return {token: {type: 'GT', value: char}, input: readChar(input)};
    case tokens.LT:
      return {token: {type: 'LT', value: char}, input: readChar(input)};
    case tokens.BANG:
      if (nextInput.char === '=') {
        const char = `${input.char + nextInput.char}`;
        return {token: {type: 'NOT_EQ', value: char}, input: readChar(nextInput)};
      } else {
        return {token: {type: 'BANG', value: char}, input: readChar(input)};
      }
    case tokens.ASTERISK:
      return {token: {type: 'ASTERISK', value: char}, input: readChar(input)};
    case tokens.FSLASH:
      return {token: {type: 'FSLASH', value: char}, input: readChar(input)};
    case null:
      return {token: {type: 'EOF', value: char}, input: readChar(input)}
    default:
      if (isLetter(char)) {
        return readIdentifier(input);
      } else if (isDigit(char)) {
        return readDigit(input);
      } else {
        return {token: {type: 'ILLEGAL', value: char}, input};
      }
  }
}

function readIdentifier(input) {
  let newInput = input;
  while(isLetter(newInput.char)) {
    newInput = readChar(newInput);
  }

  const value = input.str.substring(input.position, newInput.position);
  return {token: {type: keywordToType(value), value}, input: newInput};
}

function readDigit(input) {
  let newInput = input;
  while(isDigit(newInput.char)) {
    newInput = readChar(newInput);
  }

  const value = input.str.substring(input.position, newInput.position);
  return {token: {type: 'INT', value}, input: newInput};
}
function isLetter(char) {
  return char && LETTER_REGEX.test(char);
}

function isDigit(char) {
  return char && DIGIT_REGEX.test(char);
}

function getChar(str, index) {
  if (index >= str.length) {
    return null;
  }

  return str[index];
}

/*
 * @params {buffer} input
 * @params {integer} readPosition Position that's going to be read.
 * @params {integer} position Last position
 * @params {string} char
*/
function readChar({str, readPosition, position, char}) {
  return {
    char: getChar(str, readPosition),
    position: readPosition,
    readPosition: readPosition + 1,
    str
  };
}

function isWhitespace(char) {
  return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}

function iter(currInput) {
  if (isWhitespace(currInput.char)) {
    return iter(readChar(currInput));
  }

  const {input, token} = getToken(currInput);

  return {
    token: token,
    next: input.char && token.type !== 'ILLEGAL' ? () => iter(input) : null
  };
}

export default (str) => {
  // const inputBuffer = new Buffer(input, 'utf16le');

  return iter(readChar({str, readPosition: 0, position: 0, char: null}));
};
