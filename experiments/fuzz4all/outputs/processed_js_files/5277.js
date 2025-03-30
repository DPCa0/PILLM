 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const dataHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return target[prop];
        } else {
            console.warn(`Property ${prop} not found`);
            return undefined;
        }
    }
};

function* createIdGenerator(start = 0) {
    let id = start;
    while (true) {
        yield id++;
    }
}

const idGenerator = createIdGenerator();

async function processData(url) {
    try {
        const data = await fetchData(url);
        const proxiedData = new Proxy(data, dataHandler);
        for (let item of proxiedData) {
            print(`ID: ${idGenerator.next().value} - Name: ${item.name}`);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

const simulateApiCall = new Promise((resolve) => {
    setTimeout(() => {
        resolve([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]);
    }, 1000);
});

 
globalThis.fetch = () => simulateApiCall;

 
processData('https://api.example.com/data');
