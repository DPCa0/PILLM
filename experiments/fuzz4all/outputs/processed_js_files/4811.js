 
import { createInterface } from 'readline';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

 
async function generateNumbers() {
     
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = query => new Promise(resolve => rl.question(query, resolve));

    try {
         
        const count = parseInt(await ask('How many random numbers would you like to generate? '), 10);
        
         
        const promises = Array.from({ length: count }, async (_, i) => {
            await delay(randomInRange(500, 1500));  
            const number = randomInRange(1, 100);
            print(`Generated number ${i + 1}: ${number}`);
            return number;
        });
        
         
        const numbers = await Promise.all(promises);
        
         
        print(`\nAll numbers generated: [${numbers.join(', ')}]`);
    } finally {
        rl.close();  
    }
}

 
generateNumbers().catch(console.error);
