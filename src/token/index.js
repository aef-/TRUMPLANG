import tokens from './tokens.json'

const keywords = {
  "fn": tokens.FUNCTION,
  "let": tokens.LET,
  "true": tokens.TRUE,
  "false": tokens.FALSE,
  "if": tokens.IF,
  "else": tokens.ELSE,
  "return": tokens.RETURN
};

function keywordToType(ident) {
  return keywords[ident] || tokens.IDENT;
}

export {keywordToType, tokens};
