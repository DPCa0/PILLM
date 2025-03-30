 
import { promises as fs } from 'fs';

 
async function readFileContents(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    print(`File contents: \n${data}`);
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }
}

 
const processNumbers = (...nums) => {
  const [first, second, ...rest] = nums;
  const sum = rest.reduce((acc, num) => acc + num, first + second);
  return { first, second, sum };
};

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop);
    }
    console.error(`Property ${prop} doesn't exist`);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

// Using Promises with Fetch API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
}

// Using IIFE (Immediately Invoked Function Expression) with async function
(async () => {
  print('Starting program...');
  
  // File operation
  await readFileContents('./example.txt');
  
  // Process numbers
  const numbersResult = processNumbers(10, 20, 30, 40);
  print(`Processed numbers: ${JSON.stringify(numbersResult)}`);
  
  // Proxy usage
  print(`Person name: ${person.name}`);
  person.age = 31;
  print(`Updated person: ${JSON.stringify(person)}`);
  
  // Fetch data from an API
  await fetchData('https: 
  
  print('Program completed.');
})();
