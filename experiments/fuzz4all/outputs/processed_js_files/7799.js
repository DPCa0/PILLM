 
import { promises as fs } from 'fs';

 
(async function complexFeatureDemo() {
    try {
         
        const [first, ...rest] = [1, 2, 3, 4, 5];

        print(`First: ${first}, Rest: ${rest.join(', ')}`);

         
        const user = { firstName: 'John', lastName: 'Doe' };
        const greeting = `Hello, ${user.firstName} ${user.lastName}`;
        print(greeting);

         
        const { log } = await import('console');
        log('This is a dynamic import message!');

         
        const handler = {
            get: (target, prop) => {
                return prop in target ? target[prop] : `Property ${prop} not found`;
            }
        };
        const proxy = new Proxy(user, handler);
        print(proxy.firstName);  
        print(proxy.age);  

         
        const data = await fs.readFile('./sample.txt', 'utf8');
        print(data);

         
        const uniqueId = Symbol('id');
        const item = { [uniqueId]: 12345 };
        print(`Symbol ID: ${item[uniqueId]}`);

         
        const uniqueSet = new Set([1, 2, 2, 3, 4]);
        print(`Unique Set: ${[...uniqueSet].join(', ')}`);

         
        function* customIterator() {
            yield 'a';
            yield 'b';
            yield 'c';
        }
        for (let value of customIterator()) {
            print(`Iterated value: ${value}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
