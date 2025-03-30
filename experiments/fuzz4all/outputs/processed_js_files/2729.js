 
class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

     
    #canVote() {
        return this.#age >= 18;
    }

     
    getInfo() {
        return `${this.#name}, Age: ${this.#age}, Can Vote: ${this.#canVote()}`;
    }

     
    static #population = 0;
    static #increasePopulation() {
        return ++Person.#population;
    }

     
    static getPopulation() {
        return Person.#population;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        }
        throw new ReferenceError(`Property "${prop}" does not exist.`);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const person = new Proxy(new Person("Alice", 30), handler);

 
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https: 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        print(`User Data:`, userData);
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
}

 
(async () => {
    person.getInfo;
    print(person.getInfo());

     
    print(`Current Population: ${Person.getPopulation()}`);
    Person.#increasePopulation();  
    print(`New Population: ${Person.getPopulation()}`);

     
    await fetchUserData(1);
})();
