import lexer, {each, getToken} from 'lexer';

describe('Lexer', () => {
  it('should traverse tokens through nextToken', () => {
      const input = `let five = 5;
let ten = 10;
let add = fn(x, y) {
  x + y;
};
let result = add(five, ten);
!-*/5;
5 < 10 > 5;

if (5 < 10) {
  return true;
} else {
  return false;
}

10 == 10;
10 != 9;
`;

    const tests = [
      {type: 'LET', value: 'let'},
      {type: 'IDENT', value: 'five'},
      {type: 'ASSIGN', value: '='},
      {type: 'INT', value: '5'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'LET', value: 'let'},
      {type: 'IDENT', value: 'ten'},
      {type: 'ASSIGN', value: '='},
      {type: 'INT', value: '10'},
      {type: 'SEMICOLON', value: ';'},

      {type: 'LET', value: 'let'},
      {type: 'IDENT', value: 'add'},
      {type: 'ASSIGN', value: '='},
      {type: 'FUNCTION', value: 'fn'},
      {type: 'LPAREN', value: '('},
      {type: 'IDENT', value: 'x'},
      {type: 'COMMA', value: ','},
      {type: 'IDENT', value: 'y'},
      {type: 'RPAREN', value: ')'},
      {type: 'LBRACE', value: '{'},
      {type: 'IDENT', value: 'x'},
      {type: 'PLUS', value: '+'},
      {type: 'IDENT', value: 'y'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'RBRACE', value: '}'},
      {type: 'SEMICOLON', value: ';'},

      {type: 'LET', value: 'let'},
      {type: 'IDENT', value: 'result'},
      {type: 'ASSIGN', value: '='},
      {type: 'IDENT', value: 'add'},
      {type: 'LPAREN', value: '('},
      {type: 'IDENT', value: 'five'},
      {type: 'COMMA', value: ','},
      {type: 'IDENT', value: 'ten'},
      {type: 'RPAREN', value: ')'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'BANG', value: '!'},
      {type: 'MINUS', value: '-'},
      {type: 'ASTERISK', value: '*'},
      {type: 'FSLASH', value: '/'},
      {type: 'INT', value: '5'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'INT', value: '5'},
      {type: 'LT', value: '<'},
      {type: 'INT', value: '10'},
      {type: 'GT', value: '>'},
      {type: 'INT', value: '5'},
      {type: 'SEMICOLON', value: ';'},

      {type: 'IF', value: 'if'},
      {type: 'LPAREN', value: '('},
      {type: 'INT', value: '5'},
      {type: 'LT', value: '<'},
      {type: 'INT', value: '10'},
      {type: 'RPAREN', value: ')'},
      {type: 'LBRACE', value: '{'},
      {type: 'RETURN', value: 'return'},
      {type: 'TRUE', value: 'true'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'RBRACE', value: '}'},
      {type: 'ELSE', value: 'else'},
      {type: 'LBRACE', value: '{'},
      {type: 'RETURN', value: 'return'},
      {type: 'FALSE', value: 'false'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'RBRACE', value: '}'},
      {type: 'INT', value: '10'},
      {type: 'EQ', value: '=='},
      {type: 'INT', value: '10'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'INT', value: '10'},
      {type: 'NOT_EQ', value: '!='},
      {type: 'INT', value: '9'},
      {type: 'SEMICOLON', value: ';'},
      {type: 'EOF', value: null},
    ];

    const l = lexer(input);
    each(l, (token, index) => {
      const testToken = tests[index];
      expect(token.type).toBe(testToken.type);
      expect(token.value).toBe(testToken.value);
    });
  });
});
