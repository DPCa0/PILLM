 

 
const personHandler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const person = new Proxy({ name: "Alice", age: 25 }, personHandler);

 
const { name = "Unknown", age, ...rest } = person;
print(`Name: ${name}, Age: ${age}`);

 
async function fetchAndLog() {
    try {
        const { fetchGreeting } = await import('./greetingModule.js');
        const greeting = await fetchGreeting();
        print(greeting);

         
        const results = await Promise.all([
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ]);
        print(`Results: ${results}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
fetchAndLog();

 
class Animal {
    constructor(type) {
        this[`type_${type}`] = `This is a ${type}`;
    }

    speak() {
        print(`${this[`type_${this.type}`]} says "Hello!"`);
    }
}

const animal = new Animal('cat');
animal.speak();

Note: The `import('./greetingModule.js')` is meant to demonstrate dynamic imports. You'll need to have a `greetingModule.js` with a `fetchGreeting` function for this to work completely.