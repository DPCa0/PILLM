class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

 
const personHandler = {
    set(target, property, value) {
        if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new Error('Age must be a positive number');
        }
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const john = new Proxy(new Person('John', 30), personHandler);
john.greet();

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function celebrateBirthday(person) {
    print(`Celebrating ${person.name}'s birthday...`);
    await delay(1000);  
    person.age += 1;
    print(`Happy Birthday, ${person.name}! You are now ${person.age} years old.`);
}

celebrateBirthday(john).catch(console.error);
