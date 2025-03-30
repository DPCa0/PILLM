 

 
function processUser({ name, age, ...info }) {
    print(`User: ${name}, Age: ${age}`);
    print(`Additional Info: ${JSON.stringify(info)}`);
}

const user = {
    name: "Alice",
    age: 30,
    occupation: "Engineer",
    country: "Wonderland"
};

processUser(user);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        print(`${this.name} barks.`);
    }
}

const dog = new Dog('Rover');
dog.speak();

 
const person = {
    age: 25
};

const personProxy = new Proxy(person, {
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
});

personProxy.age = 30;  
 

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generateId = idGenerator();

print(generateId.next().value);  
print(generateId.next().value);  
print(generateId.next().value);  
