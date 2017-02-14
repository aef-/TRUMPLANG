import lexer from 'lexer';
import ast from 'ast';

describe('AST', () => {
  it('should generate an array of statements', () => {
      const input = `let five = 5;
let ten = 10;
return 10;
`;
    const test =
    [ { token: { type: 'LET', value: 'let' },
        name: { type: 'IDENT', value: 'five' },
        value: { type: 'INT', value: '5' } },
      { token: { type: 'LET', value: 'let' },
        name: { type: 'IDENT', value: 'ten' },
        value: { type: 'INT', value: '10' } },
      { token: { type: 'RETURN', value: 'return' },
        value: { type: 'INT', value: '10' } } ]
    ;
    const l = lexer(input);
    //console.info(ast(l))
    //expect(ast(l)).toEqual(test);
  });
});
