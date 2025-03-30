 
import readline from 'readline';
import { promises as fs } from 'fs';

 
(async () => {
     
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

     
    const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

     
    const userData = new Map();

     
    try {
        const name = await askQuestion('Enter your name: ');
        userData.set('Name', name);

        const age = await askQuestion('Enter your age: ');
        userData.set('Age', age);

        const language = await askQuestion('Enter your favorite programming language: ');
        userData.set('Language', language);

         
        rl.close();

         
        const { Name, Age, Language } = Object.fromEntries(userData);
        print(`Hello, ${Name}! You are ${Age} years old and love ${Language}.`);

         
        await fs.writeFile('userData.json', JSON.stringify(Object.fromEntries(userData)), 'utf8');

        print('User data saved to userData.json');
    } catch (error) {
        console.error('Error:', error);
    }
})();
