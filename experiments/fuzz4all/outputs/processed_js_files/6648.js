 
import { createInterface } from 'readline';
import { promises as fs } from 'fs';

 
async function processData() {
     
    const filePath = `./data.txt`;
    
    try {
         
        const _ = await import('lodash');
        
         
        const data = await fs.readFile(filePath, 'utf-8');

         
        const numbers = data.split('\n')
                            .map(line => parseInt(line.trim()))
                            .filter(num => !isNaN(num));

        const total = numbers.reduce((acc, num) => acc + num, 0);
        const average = _.mean(numbers);

        print(`Total: ${total}, Average: ${average.toFixed(2)}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

 
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

 
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function main() {
    const response = await askQuestion("Do you want to process the file data? (yes/no) ");
    rl.close();
    if (response.toLowerCase() === 'yes') {
         
        await processData();
    } else {
        print('Operation cancelled by the user.');
    }
}

 
main();
