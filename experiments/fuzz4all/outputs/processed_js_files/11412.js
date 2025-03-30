 
async function fetchData(url) {
     
    const response = await fetch(url);
    const data = await response.json();

     
    const { name, age, occupation } = data;

     
    return `Name: ${name}, Age: ${age}, Occupation: ${occupation}, Tags: ${[...data.tags].join(', ')}`;
}

 
class Person {
    #name;
    #age;
    
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

     
    static async createFromUrl(url) {
        const response = await fetch(url);
        const { name, age } = await response.json();
        return new Person(name, age);
    }

     
    getName() {
        return this.#name;
    }

    getAge() {
        return this.#age;
    }
}

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    }
};

const personProxy = new Proxy(new Person('Alice', 30), handler);

 
const personMap = new Map();
personMap.set(personProxy.getName(), personProxy);

 
(async () => {
    try {
        const data = await fetchData('https://api.example.com/user');
        print(data);

        const bob = await Person.createFromUrl('https://api.example.com/user/bob');
        print(`Created user: ${bob.getName()}, Age: ${bob.getAge()}`);

        print(personProxy.getName());
        print(personProxy.getAge());
        print(personProxy.address);  
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
