 
const readline = require('readline');
const fs = require('fs').promises;

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
async function processInput() {
   
  const question = (query) => new Promise(resolve => rl.question(query, resolve));
  
  try {
     
    const name = await question("What's your name? ");
    
     
    if (!/^[a-zA-Z]+$/.test(name)) {
      throw new Error('Name should contain only letters.');
    }
    
     
    const number = await question("What's your favorite number? ");
    
     
    const favoriteNumber = Number(number);
    if (!Number.isInteger(favoriteNumber)) {
      throw new Error('Please enter a valid integer.');
    }
    
     
    const taggedTemplate = (strings, ...values) => {
      return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `[${values[i]}]` : ''}`, '');
    };
    
    const message = taggedTemplate`Hello [${name}], your favorite number is [${favoriteNumber}].`;
    print(message);
    
     
    await fs.writeFile('userData.txt', `Name: ${name}, Favorite Number: ${favoriteNumber}`);
    print('Your data has been saved to userData.txt');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
     
    rl.close();
  }
}

 
processInput();
