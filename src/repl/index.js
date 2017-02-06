import readline from 'readline';
import lexer from 'lexer';
import {tokens} from 'token';
const PROMPT = '>> ';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line){
  let input = lexer(line);

  do {
    console.info(input);
  } while (input.next && (input = input.next()) && input.token.type !== 'EOF');

  rl.setPrompt(PROMPT);
  rl.prompt();
});

rl.setPrompt(PROMPT);
rl.prompt();
