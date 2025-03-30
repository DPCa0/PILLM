 
const handler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
proxy.a;
proxy.b = 10;

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data received"), 1000);
    });
}

(async () => {
    const data = await fetchData();
    print(data);
})();

 
const map = new Map();
map.set('name', 'John');
map.set('age', 30);

for (let [key, value] of map) {
    print(`${key}: ${value}`);
}

const set = new Set([1, 2, 3, 4, 5]);
set.add(6);
set.delete(3);

print(`Set contains 2: ${set.has(2)}`);

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
print(gen.next().value);
print(gen.next().value);

 
 
export const add = (x, y) => x + y;

 
import { add } from './module.js';
print(`Sum: ${add(5, 3)}`);
