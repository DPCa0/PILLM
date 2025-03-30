 
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

 
(async function() {
     
    const favoriteNumbers = new Map();
    const uniqueNumbers = new Set();

     
    const rl = readline.createInterface({ input, output });
    
    try {
         
        for await (const number of rl) {
            if (number.toLowerCase() === 'done') break;

            const num = parseInt(number.trim());
            if (isNaN(num)) {
                print("Please enter a valid number or 'done' to finish.");
                continue;
            }

             
            print(highlight`You entered: ${num}`);

             
            uniqueNumbers.add(num);
            favoriteNumbers.set(num, (favoriteNumbers.get(num) || 0) + 1);
        }
        
        print("\nYou entered these unique numbers:", [...uniqueNumbers].join(', '));
        print("Number of entries for each number:");
        for (let [num, count] of favoriteNumbers) {
            print(`${num}: ${count}`);
        }
    } finally {
        rl.close();
    }
})();

 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, idx) => `${acc}${str}\x1b[32m${values[idx] || ''}\x1b[0m`, '');
}
