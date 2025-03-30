 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: `Fetched data from ${url}` });
        }, 1000);
    });
}

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const data = new Proxy({}, handler);

 
async function main() {
    const idGen = idGenerator();

    print('Starting data fetch sequence...');
    const urls = ['http://example.com/api/1', 'http://example.com/api/2'];
    for (const url of urls) {
        try {
            const response = await fetchData(url);
            const id = idGen.next().value;
            data[id] = response.data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    print('Data fetch complete. Current data state:', data);
}

main();
