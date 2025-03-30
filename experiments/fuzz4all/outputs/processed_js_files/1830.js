 
import { createInterface } from 'readline/promises';
import { setTimeout } from 'timers/promises';

 
(async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

   
  async function* delayedInput(questions) {
    for (let question of questions) {
      print(`Question will appear in 2 seconds...`);
      await setTimeout(2000);  
      yield rl.question(question);
    }
  }

  const responses = [];
  const questions = [
    "What's your name? ",
    "How old are you? ",
    "What's your favorite programming language? "
  ];

   
  for await (let response of delayedInput(questions)) {
    responses.push(response);
  }

   
  const [name, age, language] = responses;
  print(`Hello, ${name}! You are ${age} years old and love ${language}.`);

  rl.close();
})();
