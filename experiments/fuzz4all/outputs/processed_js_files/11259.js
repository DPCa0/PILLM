 

const reactiveHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return target[prop];
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

async function* fetchData(urls) {
    for (const url of urls) {
        print(`Fetching from ${url}`);
        const data = await fetch(url).then(res => res.json());
        yield data;
    }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const idGen = idGenerator();
const proxyData = new Proxy({ name: 'Alice', age: 25 }, reactiveHandler);

(async () => {
    const dataIterator = fetchData(urls);
    
    proxyData.name = 'Bob';  

    for await (const data of dataIterator) {
        print(`Data received:`, data);
        print(`Generated ID: ${idGen.next().value}`);
    }

    print(`Current age: ${proxyData.age}`);  
})();
