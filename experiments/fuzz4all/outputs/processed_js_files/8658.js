 

 
import fs from 'fs/promises';

 
async function advancedJsFeatures() {
    try {
         
        const handler = {
            get: (target, property) => {
                return property in target ? target[property] : `Property ${property} is not available`;
            }
        };

        const complexObject = new Proxy({
            message: "Hello, advanced world!",
            greet: function(name) {
                return `Hello, ${name}!`;
            }
        }, handler);

        print(complexObject.message);
        print(complexObject.greet("Developer"));
        print(complexObject.nonexistentProperty);

         
        const map = new Map();
        const key1 = { id: 1 };
        const key2 = { id: 2 };

        map.set(key1, 'Object 1');
        map.set(key2, 'Object 2');
        print([...map]);

         
        const fileContent = await fs.readFile('example.txt', 'utf8');
        print('File Content:', fileContent);

         
        const set = new Set(['apple', 'banana', 'apple']);
        set.add('orange');
        print(set);

         
        function* idGenerator() {
            let id = 1;
            while (true) {
                yield id++;
            }
        }

        const gen = idGenerator();
        print(gen.next().value);  
        print(gen.next().value);  

    } catch (error) {
        console.error('Error:', error);
    }
}

 
advancedJsFeatures();

Note: This code uses modern JavaScript features such as async/await, Proxy, Map, Set, fs/promises for file handling, and Generators. Ensure you have a file named `example.txt` in the same directory or modify the file path as needed.