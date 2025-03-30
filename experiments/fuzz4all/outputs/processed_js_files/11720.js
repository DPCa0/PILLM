 
import { promises as fs } from 'fs';

 
(async () => {
    try {
         
        const { log } = console;

         
        const uniqueValues = new Set([1, 2, 3, 4, 5, 5, 4]);

         
        const uniqueArray = [...uniqueValues];

         
        const squaredArray = uniqueArray.map(x => x ** 2);

         
        await fs.writeFile('output.txt', squaredArray.join(', '));

         
        const data = await fs.readFile('output.txt', 'utf8');

         
        log(`Squared Unique Values: ${data}`);

    } catch (error) {
        console.error('Error:', error);
    }
})();
