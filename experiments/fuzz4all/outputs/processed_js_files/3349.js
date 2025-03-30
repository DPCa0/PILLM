 
const readline = require('readline');
const fs = require('fs').promises;

 
async function processFile() {
  try {
     
    const data = await fs.readFile('example.txt', 'utf-8');
    print('File contents:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
const logger = {
  log(message) {
    print(`[LOG]: ${message}`);
  },
};

const userLogger = new Proxy(logger, {
  apply(target, thisArg, argumentsList) {
    const [message] = argumentsList;
    Reflect.apply(target.log, thisArg, [message]);
  },
});

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

 
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

 
(async () => {
  try {
    const name = await askQuestion('What is your name? ');
    userLogger.log(`User entered name: ${name}`);

    const age = await askQuestion('What is your age? ');
    userLogger.log(`User entered age: ${age}`);

    print(`Hello, ${name}. You are ${age} years old.`);

     
    rl.close();

     
    await processFile();
  } catch (error) {
    console.error('An error occurred:', error);
    rl.close();
  }
})();

This JavaScript program demonstrates several advanced features including modules (`readline`, `fs`), asynchronous programming with `async/await`, use of proxies for logging, and a self-invoking async function. The program takes user input, logs it using a proxy, and reads a file asynchronously.