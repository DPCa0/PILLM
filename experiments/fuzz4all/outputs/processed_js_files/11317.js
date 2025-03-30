 
const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const askQuestion = (query) => {
  return new Promise(resolve => rl.question(query, resolve));
};

 
(async () => {
  try {
     
    let { sqrt, random, floor, pow } = Math;
    let name = await askQuestion("What's your name? ");
    print(`Hello, ${name.trim()}! Let's do some math magic.`);

    // Using a Set to ensure unique random numbers
    let numbers = new Set();
    while (numbers.size < 5) {
      numbers.add(floor(random() * 100));
    }
    
    // Using spread operator and map function
    let squaredNumbers = [...numbers].map(x => pow(x, 2));
    print(`Your magic numbers are: ${[...numbers].join(', ')}`);
    print(`Their squares are: ${squaredNumbers.join(', ')}`);

    // Using a Proxy to trap operations on a numbers object
    let handler = {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          print(`Trying to access nonexistent property '${prop}'`);
          return null;
        }
      }
    };

    let numbersProxy = new Proxy([...numbers], handler);
    print(`The first magic number is ${numbersProxy[0]}.`);
    print(`Accessing a non-existent property: ${numbersProxy['length']}`);

    // Closing the readline interface
    rl.close();
  } catch (error) {
    console.error('An error occurred:', error);
    rl.close();
  }
})();
