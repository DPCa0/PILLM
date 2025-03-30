 
import { EventEmitter } from 'events';

 
const handler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
    }
};

const targetObject = { a: 10, b: 20 };
const proxy = new Proxy(targetObject, handler);

 
async function* asyncNumberGenerator() {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', (msg) => {
    print(`Received event with message: ${msg}`);
});

myEmitter.emit('event', 'Hello, EventEmitter!');

 
async function printNumbers() {
    for await (let num of asyncNumberGenerator()) {
        print(`Generated number: ${num}`);
    }
}

 
print(proxy.a);
print(proxy.b);

 
printNumbers();
