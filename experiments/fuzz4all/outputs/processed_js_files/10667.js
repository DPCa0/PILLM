 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        return Reflect.set(target, prop, value);
    }
};

 
class Person {
    #privateProperty = 'Private';
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `${this.name}, ${this.age} years old`;
    }
}

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

 
const iterableObject = {
    data: [1, 2, 3, 4, 5],
    [Symbol.iterator]() {
        let index = 0;
        const { data } = this;
        return {
            next() {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    try {
        const jsonData = await fetchData(url);
        print('Fetched data:', jsonData);

        const person = new Person('Alice', 30);
        print('Person Details:', person.getDetails());

        const idGen = idGenerator();
        print('Generated IDs:', idGen.next().value, idGen.next().value);

        const proxy = new Proxy(person, dataHandler);
        proxy.name = 'Bob';
        print('Proxy Name:', proxy.name);

        print('Iterating over object:');
        for (const value of iterableObject) {
            print(value);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
