import tokens from './tokens.json'

const keywords = {
  "fn": tokens.FUNCTION,
  "let": tokens.LET,
};

function keywordToType(ident) {
  return keywords[ident] || tokens.IDENT;
}

export {keywordToType, tokens};
