 
class Person {
    #firstName;
    #lastName;

    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    get fullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    static *nameGenerator(names) {
        for (let name of names) {
            yield new Person(...name);
        }
    }
}

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

 
const personHandler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const proxyPerson = new Proxy(new Person('John', 'Doe'), personHandler);

 
const names = [['Alice', 'Smith'], ['Bob', 'Johnson']];
const personGen = Person.nameGenerator(names);

for (let person of personGen) {
    print(person.fullName);
}

 
print(proxyPerson.fullName);

 
fetchData('https://api.example.com/data').then(data => print(data));
