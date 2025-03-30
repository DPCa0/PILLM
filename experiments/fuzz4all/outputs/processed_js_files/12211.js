 
const readline = require('readline');
const { promisify } = require('util');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const question = promisify(rl.question).bind(rl);

 
async function complexFeatureDemo() {
  try {
     
    const [a, b, c] = [1, 2, 3];

     
    print(`Destructured values are: a = ${a}, b = ${b}, c = ${c}`);

     
    const numbers = [1, 2, 3, 4, 5];
    const processedNumbers = numbers
      .map(num => num * 2)        
      .filter(num => num > 5)     
      .reduce((acc, num) => acc + num, 0);  

    print(`Processed numbers result: ${processedNumbers}`);

     
    const { default: fetch } = await import('node-fetch');

     
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    print('Fetched data from API:', data);

     
    const nestedObj = { user: { profile: { name: 'Alice' } } };
    print(`User's name is: ${nestedObj.user?.profile?.name}`);

    // Await user input using the promisified question function
    const userInput = await question('Enter something: ');
    print(`You entered: ${userInput}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
     
    rl.close();
  }
}

 
complexFeatureDemo();
