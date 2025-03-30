 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const question = (query) => new Promise(resolve => readline.question(query, resolve));

(async function main() {
  try {
     
    const { random } = await import('lodash');

     
    const greet = ({ name, city }) => `Hello, ${name} from ${city}!`;

     
    const userResponse = await question("What's your name? ") ?? 'Anonymous';

    const user = { 
      name: userResponse, 
      city: (await question("Where are you from? ")) || 'Unknown'
    };

     
    print(`🔹 ${greet(user)} It's great to meet you!`);

    // Maps and Sets - collections with special properties
    const uniqueNumbers = new Set([1, 2, 3, random(1, 100)]);
    print(`Unique Numbers Set: ${[...uniqueNumbers].join(', ')}`);

    // Proxy to log access operations on an object
    const handler = {
      get: function(target, prop) {
        print(`Property '${prop}' was accessed`);
        return target[prop];
      }
    };
    const proxyUser = new Proxy(user, handler);
    print(`Accessing name: ${proxyUser.name}`);

     
    readline.close();

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
