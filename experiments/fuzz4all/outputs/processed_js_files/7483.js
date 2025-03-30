 
import fs from 'fs';
import { EventEmitter } from 'events';

 
async function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

 
const processArgs = (...args) => {
    const [first, second, ...rest] = args;
    return { first, second, rest };
};

 
class CustomEmitter extends EventEmitter {
    constructor() {
        super();
    }

    emitCustomEvent(data) {
        this.emit('customEvent', data);
    }
}

 
const targetObject = {
    name: 'ProxyTarget',
    value: 42
};

const handler = {
    get: (target, property) => {
        if (property in target) {
            return Reflect.get(target, property);
        } else {
            return `Property "${property}" does not exist on target`;
        }
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const proxy = new Proxy(targetObject, handler);

 
(async function main() {
    try {
        const data = await readFileAsync('./example.txt');
        print('File data:', data);

        const argsData = processArgs(1, 2, 3, 4, 5);
        print('Processed Args:', argsData);

        const emitter = new CustomEmitter();
        emitter.on('customEvent', (data) => {
            print('Custom Event Received:', data);
        });
        emitter.emitCustomEvent({ msg: 'Hello EventEmitter!' });

        print('Proxy Name:', proxy.name);
        proxy.newProperty = 'New Value';
        print('New Proxy Property:', proxy.newProperty);

    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
