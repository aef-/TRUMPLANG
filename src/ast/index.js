import parse from 'parser';

function buildTree(rootInput, root = []) {
  const {statement, input} = parse(rootInput);
  if (statement === null) {
    return root;
  } else {
    return buildTree(input, root.concat(statement));
  }
}

export default function(lexer) {
  return buildTree(lexer);
}
