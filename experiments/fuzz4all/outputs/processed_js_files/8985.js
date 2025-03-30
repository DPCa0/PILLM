 

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

 
const handler = {
    set(target, property, value) {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    },
};

const monitoredObject = new Proxy({}, handler);

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
const UNIQUE_KEY = Symbol('unique');

const complexObject = {
    [UNIQUE_KEY]: 'secret',
    displayUnique() {
        print(this[UNIQUE_KEY]);
    },
};

 
(async () => {
    monitoredObject.name = 'Advanced JS';

    const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', apiData);

    print('Generated ID:', gen.next().value);
    print('Generated ID:', gen.next().value);

    complexObject.displayUnique();
})();
