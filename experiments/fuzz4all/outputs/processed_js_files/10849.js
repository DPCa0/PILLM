 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} not found`);
            return undefined;
        }
    },
    set: (target, prop, value, receiver) => {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

function getPersonDetails({ name, age }) {
    return new Promise((resolve, reject) => {
        if (!name || !age) {
            reject('Incomplete person details');
        }
        setTimeout(() => resolve(`Name: ${name}, Age: ${age}`), 1000);
    });
}

async function displayDetails() {
    try {
        const details = await getPersonDetails(person);
        print(details);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
function greet(greeting = 'Hello', name = 'stranger') {
    print(`${greeting}, ${name}!`);
}

 
person.age = 35;
greet('Hi', person.name);
displayDetails();
