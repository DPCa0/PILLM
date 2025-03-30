 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const handler = {
    get: function(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const dataMap = new Map();
const proxyMap = new Proxy(dataMap, handler);

(async function main() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const data = await fetchData(url);

        data.slice(0, 5).forEach(item => {
            const id = idGen.next().value;
            proxyMap.set(id, { ...item, timestamp: new Date().toISOString() });
        });

        for (let [key, value] of proxyMap) {
            print(`ID: ${key}, Title: ${value.title}, Timestamp: ${value.timestamp}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
