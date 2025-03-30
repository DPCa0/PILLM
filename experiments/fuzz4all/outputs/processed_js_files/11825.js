 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
const user = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
};

const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            throw new ReferenceError(`Property "${property}" does not exist.`);
        }
    },
    set(target, property, value) {
        if (property === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new TypeError('Age must be a positive number.');
        }
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    },
};

const proxyUser = new Proxy(user, handler);

 
async function readFileContents(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        print('File data:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    print(`Hello, ${name}!`);
});

 
(async () => {
    proxyUser.firstName;  
    proxyUser.age = 31;  

    await readFileContents('./example.txt');  

    print('Generated ID:', gen.next().value);  

    eventEmitter.emit('greet', 'Alice');  
})();
