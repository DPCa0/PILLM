 

 
const person = { name: "Alice", age: 25 };

const handler = {
    get: (target, prop) => {
        if (prop === 'age') {
            return `${target[prop]} years old`;
        }
        return target[prop];
    },
    set: (target, prop, value) => {
        if (prop === 'age' && typeof value !== 'number') {
            throw new Error("Age must be a number");
        }
        target[prop] = value;
        return true;
    }
};

const proxyPerson = new Proxy(person, handler);

print(proxyPerson.name);  
print(proxyPerson.age);  

 
const uniqueKey = Symbol('unique');
person[uniqueKey] = 'Secret Data';
print(person[uniqueKey]);  

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

const numbers = numberGenerator();
print(numbers.next().value);  
print(numbers.next().value);  

 
async function fetchData() {
    const promise = new Promise((resolve) => {
        setTimeout(() => resolve("Data fetched!"), 1000);
    });
    const data = await promise;
    print(data);
}

fetchData();

 
const map = new Map();
map.set('name', 'Bob');
map.set('occupation', 'Developer');

for (let [key, value] of map) {
    print(`${key}: ${value}`);
}

 
const set = new Set([1, 2, 3, 4, 5, 5, 6]);
set.add(7);
set.delete(1);
print(Array.from(set));  

 
const { name, ...rest } = person;
print(name);  
print(rest);  

 
const multi