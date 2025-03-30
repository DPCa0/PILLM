 
class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

     
    #formatName() {
        return this.#name.toUpperCase();
    }

    get details() {
        return `${this.#formatName()} is ${this.#age} years old.`;
    }

     
    static createPeople(names) {
        return names.map(name => new Person(name, Math.floor(Math.random() * 100)));
    }
}

 
function* personGenerator(people) {
    for (let person of people) {
        yield person.details;
    }
}

 
async function displayPeople() {
    const peopleNames = ['Alice', 'Bob', 'Charlie'];
    const people = Person.createPeople(peopleNames);

     
    const personIterator = personGenerator(people);
    for (const personDetails of personIterator) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        print(personDetails);
    }
}

 
const personProxyHandler = {
    get(target, property) {
        print(`Accessing ${property}`);
        return target[property];
    }
};

const proxyPerson = new Proxy(new Person('Dave', 45), personProxyHandler);

print(proxyPerson.details);  

 
displayPeople();
