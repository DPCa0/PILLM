 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    },
    set: function(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError("Age must be a number");
        }
        target[prop] = value;
        return true;
    }
};

const person = new Proxy({}, handler);
person.name = "Alice";
person.age = 25;

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
const uniqueIds = new Set();

 
class Utility {
    static version = '1.0';

    static generateUniqueId() {
        let newId;
        do {
            newId = gen.next().value;
        } while (uniqueIds.has(newId));
        uniqueIds.add(newId);
        return newId;
    }
}

 
(async () => {
    print(`Utility version: ${Utility.version}`);
    print(`Generated ID: ${Utility.generateUniqueId()}`);
    print(`Person Name: ${person.name}`);
    print(`Fetching data from a sample API:`);
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print(data);
})();
