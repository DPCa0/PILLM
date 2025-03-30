 
const readline = require('readline');

 
const { log } = console;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

 
(async function main() {
  try {
     
    async function* fibonacci(limit) {
      let [a, b] = [0, 1];
      while (a <= limit) {
        yield a;
        [a, b] = [b, a + b];
      }
    }

    const limit = await askQuestion("Enter the limit for the Fibonacci sequence: ");
    
    log(`Fibonacci sequence up to ${limit}:`);
    for await (const num of fibonacci(Number(limit))) {
      log(num);
    }

     
    const person = { firstName: "John", lastName: "Doe" };
    const handler = {
      get(target, property) {
        return property in target ? target[property] : `Property ${property} not found.`;
      }
    };
    const proxyPerson = new Proxy(person, handler);

     
    function logger(strings, ...values) {
      return strings.reduce((acc, str, index) => `${acc}${str}${values[index] || ''}`, '');
    }

    log(logger`Accessing properties: firstName - ${proxyPerson.firstName}, age - ${proxyPerson.age}`);

  } catch (error) {
    log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
})();
