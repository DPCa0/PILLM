 
import { createInterface } from 'readline/promises';

 
const getInput = async (question) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await rl.question(`${question}: `);
  rl.close();
  return answer;
};

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} doesn't exist!`;
  }
};

const data = new Proxy({}, handler);

// Using Map, Set, and Spread Operator
const uniqueNames = new Set(["Alice", "Bob", "Charlie"]);
const nameMap = new Map([...uniqueNames].map((name, index) => [index, name]));

// Main async function to demonstrate functionality
(async () => {
  // Arrow function and template literals
  const greet = (name) => print(`Hello, ${name}!`);

  const userName = await getInput('Enter your name');
  greet(userName);

  print("\nName mappings using Map:");
  for (let [key, value] of nameMap) {
    print(`${key} => ${value}`);
  }

  // Reflect to manipulate properties
  Reflect.set(data, 'user', userName);
  print("\nDynamic object behavior using Proxy and Reflect:");
  print(`User: ${data.user}`);
  print(`Unknown property: ${data.unknown}`);

   
  const simulateAsyncTasks = Array.from({ length: 3 }, (_, i) =>
    new Promise((resolve) => setTimeout(() => resolve(`Task ${i + 1} completed`), Math.random() * 1000))
  );

  const results = await Promise.all(simulateAsyncTasks);
  print("\nResults of simulated asynchronous tasks:");
  results.forEach(result => print(result));
})();
