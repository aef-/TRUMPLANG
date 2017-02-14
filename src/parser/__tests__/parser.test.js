import parse from 'parser';
import lexer from 'lexer';

describe('Parser', () => {
  it('should parse let statements', () => {
      const input = `let x = 5;
let y = 10;
let foobar = 838383;
`.split('\n');

    const tests =
      [ { token: { type: 'LET', value: 'let' },
          name: { type: 'IDENT', value: 'x' },
          value: {
            token: { type: 'INT', value: '5' },
            value: 5
          },
        },
        { token: { type: 'LET', value: 'let' },
          name: { type: 'IDENT', value: 'y' },
          value: {
            token: { type: 'INT', value: '10' },
            value: 10
          },
        },
        { token: { type: 'LET', value: 'let' },
          name: { type: 'IDENT', value: 'foobar' },
          value: {
            token: { type: 'INT', value: '838383' },
            value: 838383
          },
        } ]
    ;

    tests.forEach((statement, i) => {
      expect(parse(lexer(input[i])).statement).toEqual(statement);
    })
  });

  it('should parse return statements', () => {
      const input = `return 5;
return 10;
return 838383;
`.split('\n');

    const tests =
      [
        { token: { type: 'RETURN', value: 'return' },
          value: { token: { type: 'INT', value: '5' }, value: 5 } },
        { token: { type: 'RETURN', value: 'return' },
            value: { token: { type: 'INT', value: '10' }, value: 10 } },
        { token: { type: 'RETURN', value: 'return' },
            value: { token: { type: 'INT', value: '838383' }, value: 838383 } }
      ];

    tests.forEach((statement, i) => {
      expect(parse(lexer(input[i])).statement).toEqual(statement);
    })
  });

  it('should parse identity expressions', () => {
      const input = `test_identity;
`.split('\n');

    const tests =
      [{"expression": {"token": {"type": "IDENT", "value": "test_identity"}, "value": "test_identity"}, "token": {"type": "IDENT", "value": "test_identity"}}];

    tests.forEach((statement, i) => {
      expect(parse(lexer(input[i])).statement).toEqual(statement);
    })
  });

  it('should parse integer expressions', () => {
      const input = `20;
`.split('\n');

    const tests =
      [{"expression": {"token": {"type": "INT", "value": "20"}, "value": 20}, "token": {"type": "INT", "value": "20"}}];

    tests.forEach((statement, i) => {
      expect(parse(lexer(input[i])).statement).toEqual(statement);
    })
  });

  it('should parse prefix operator expressions', () => {
      const input = `!10;
-25;
`.split('\n');

    const tests = [
			{ token: { type: 'BANG', value: '!' },
				expression: { operator: '!', right: { token: { type: 'INT', value: '10' }, value: 10 } } },
			{ token: { type: 'MINUS', value: '-' },
				expression: { operator: '-', right: { token: { type: 'INT', value: '25' }, value: 25 } } }
		];

    tests.forEach((statement, i) => {
      expect(parse(lexer(input[i])).statement).toEqual(statement);
    })
  });
});
