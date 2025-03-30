 
const fs = require('fs').promises;

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexProgram() {
     
    const filePath = './data.json';
    
     
    let data;
    try {
         
        const fileContents = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContents);
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        data = { counter: 0 };
    }

     
    const { counter } = data;
    print(`Initial counter value: ${counter}`);

     
    const uniqueNumbers = new Set([counter]);

     
    const newNumbers = [1, 2, 3, 4, 5].map(num => num + counter);
    newNumbers.forEach(num => uniqueNumbers.add(num));

     
    const allNumbers = [...uniqueNumbers];

     
    print(`Unique numbers: ${allNumbers.join(', ')}`);

     
    const newCounter = Math.max(...allNumbers) + 1;

     
    const newData = { counter: newCounter };

    try {
         
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');
        print(`Updated counter saved: ${newCounter}`);
    } catch (error) {
        console.error(`Error writing file: ${error}`);
    }

     
    async function recursiveOperation(value) {
        if (value <= 0) {
            return print('Recursive operation complete.');
        }
        print(`Recursive countdown: ${value}`);
        await delay(1000);  
        await recursiveOperation(value - 1);
    }

     