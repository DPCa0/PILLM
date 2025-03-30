 
import fs from 'fs/promises';

 
async function complexOperation() {
    try {
         
        const [a, b] = [5, 10];
        const result = `Sum of ${a} and ${b} is ${a + b}`;
        
         
        await fs.writeFile('output.txt', result);
        
         
        const data = await fs.readFile('output.txt', 'utf8');
        
         
        const uniqueChars = [...new Set(data)];
        
         
        print(data);
        print(`Unique characters: ${uniqueChars.join(', ')}`);
        
         
        const handler = {
            get: function(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                return `Property "${prop}" doesn't exist`;
            }
        };
        
        const obj = new Proxy({ greeting: 'Hello' }, handler);
        print(obj.greeting); // Output: Hello
        print(obj.nonExistentProperty); // Output: Property "nonExistentProperty" doesn't exist
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
complexOperation();
