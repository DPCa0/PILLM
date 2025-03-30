 
import readline from 'readline';

 
async function getUserInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  const input = await question(prompt);
  rl.close();
  return input;
}

 
const logger = {
  get: (target, prop) => {
    print(`Property '${prop}' has been accessed.`);
    return prop in target ? target[prop] : `Property '${prop}' not found.`;
  },
};

 
const secretSymbol = Symbol('secret');
const user = new Proxy({
  name: 'John Doe',
  age: 30,
  [secretSymbol]: 'hiddenValue'
}, logger);

 
function* userDetails(userObj) {
  yield `Name: ${userObj.name}`;
  yield `Age: ${userObj.age}`;
}

 
(async () => {
  print("Advanced JavaScript Program");

  const userName = await getUserInput("What's your name? ");
  print(`Hello, ${userName}!`);

  print("Fetching user details...");

  for (let detail of userDetails(user)) {
    print(detail);
  }

  print(`Trying to access a non-existent property: ${user.nonExistentProperty}`);
  print(`Accessing a Symbol property: ${user[secretSymbol]}`);
})();
