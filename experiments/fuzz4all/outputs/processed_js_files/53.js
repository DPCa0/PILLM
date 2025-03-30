 
import readline from 'readline/promises';
import { createInterface } from 'readline';

 
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const getInput = (prompt) => rl.question(prompt);

 
(async function main() {
  try {
     
    const input = await getInput('Enter comma-separated numbers: ');

     
    const numberSet = new Set(input.split(',').map(Number));

     
    const uniqueNumbers = [...numberSet].filter(num => !Number.isNaN(num));

     
    const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

     
    print(`Unique numbers: ${uniqueNumbers.join(', ')}`);
    print(`Sum of unique numbers: ${sum}`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
     
    rl.close();
  }
})();
