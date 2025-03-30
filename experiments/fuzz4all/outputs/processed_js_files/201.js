 
import { promises as fs } from 'fs';

 
async function complexFunctionality() {
    try {
         
        const person = { name: 'Alice', age: 30 };
        const { name, age } = person;
        print(`Person: ${name}, Age: ${age}`);

         
        const uniqueNumbers = new Set([1, 2, 2, 3, 4]);
        print('Unique Numbers:', [...uniqueNumbers]);

         
        const squares = [...uniqueNumbers].map(num => num ** 2);
        print('Squares:', squares);

         
        const fileName = 'data.txt';
        await fs.writeFile(fileName, `Name: ${name}, Age: ${age}, Squares: ${squares.join(', ')}`);

         
        const data = await fs.readFile(fileName, 'utf8');
        print('File Content:', data);
        
         
        const handler = {
            get(target, prop, receiver) {
                print(`Property "${prop}" accessed`);
                return Reflect.get(target, prop, receiver);
            }
        };
        const proxyPerson = new Proxy(person, handler);
        print('Proxy Name Access:', proxyPerson.name);

         
        function* numberGenerator() {
            yield* uniqueNumbers;
        }
        const gen = numberGenerator();
        for (const num of gen) {
            print('Generated number:', num);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

complexFunctionality();
