 

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return Reflect.get(...arguments);
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const person = {
    name: "Alice",
    age: 30
};

const observablePerson = new Proxy(person, handler);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch data: ${error.message}`);
    }
}

 
async function* asyncGenerator(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];

(async () => {
    for await (const data of asyncGenerator(urls)) {
        print(data);
    }
})();

 
const { name, age = 25 } = observablePerson;
print(`Name: ${name}, Age: ${age}`);

 
observablePerson.occupation = 'Developer';
