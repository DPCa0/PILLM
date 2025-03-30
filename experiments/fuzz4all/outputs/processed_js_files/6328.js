 
class Person {
    #privateData;
    
    constructor(name) {
        this.name = name;
        this.#privateData = { hobbies: [] };
    }
    
    static greet() {
        return "Hello";
    }
    
    addHobby(hobby) {
        this.#privateData.hobbies.push(hobby);
    }
    
    get hobbies() {
        return this.#privateData.hobbies.join(', ');
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return property in target ? target[property] : `Property ${property} doesn't exist`;
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

// Create an instance of Person with Proxy
const personProxy = new Proxy(new Person('Alice'), handler);

// Using template literals for dynamic strings
const greetingMessage = `${Person.greet()}, my name is ${personProxy.name}.`;

// Symbol to store unique IDs
const ID = Symbol('id');
personProxy[ID] = 12345;

// Function with a closure capturing local state
function closureExample() {
    let closureCounter = 0;
    return function () {
        return ++closureCounter;
    };
}

const incrementClosure = closureExample();

// Demonstrating usage
print(greetingMessage);
personProxy.addHobby('Reading');
personProxy.addHobby('Cooking');
print(`My hobbies are: ${personProxy.hobbies}.`);
print(`Unique ID: ${personProxy[ID]}`);
print(`Closure counter: ${incrementClosure()}`);  
print(`Closure counter: ${incrementClosure()}`);  
