class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

function createProxy(target) {
    return new Proxy(target, {
        get(obj, prop) {
            if (prop in obj) {
                print(`Getting ${prop}`);
                return obj[prop];
            } else {
                print(`Property ${prop} doesn't exist!`);
                return null;
            }
        },
        set(obj, prop, value) {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
}

const john = new Person('John Doe', 30);
const proxiedJohn = createProxy(john);

proxiedJohn.greet();

proxiedJohn.age = 31;
print(`Updated age: ${proxiedJohn.age}`);

// Using async/await with Promises and dynamic import
async function fetchData() {
    const { fetch } = await import('node-fetch');
    try {
        const response = await fetch('https: 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        print(`Fetched data: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

fetchData();
