 
import readline from 'readline';

 
import { promisify } from 'util';

 
const responses = new Map();
const questions = [
  'What is your name?',
  'What is your favorite programming language?',
  'What is your age?',
];

 
async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = promisify(rl.question).bind(rl);
  const answer = await question(query);
  rl.close();
  return answer;
}

 
(async () => {
  for await (const [index, question] of questions.entries()) {
    responses.set(index, await askQuestion(`${question} `));
  }

   
  const name = responses.get(0) ?? 'Anonymous';
  const language = responses.get(1) ?? 'JavaScript';
  const age = responses.get(2) ?? 'unknown age';

   
  function format(strings, name, language, age) {
    return `${strings[0]}${name}${strings[1]}${language}${strings[2]}${age}${strings[3]}`;
  }
  print(format`Hello, ${name}! Your favorite language is ${language}. You are ${age} years old.`);

   
  const validLanguages = new Set(['JavaScript', 'Python', 'Java', 'C++', 'Ruby']);

  if (validLanguages.has(language)) {
    print(`${language} is indeed a popular language.`);
  } else {
    print(`That's an uncommon choice!`);
  }

   
  async function* responseIterator(map) {
    for (const response of map.values()) {
      yield response;
    }
  }

  for await (const response of responseIterator(responses)) {
    print(`Received: ${response}`);
  }
})();
