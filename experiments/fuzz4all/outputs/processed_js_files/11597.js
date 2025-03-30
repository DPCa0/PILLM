 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(data.map(item => ({ ...item, processed: true })));
            } else {
                reject('No data to process');
            }
        }, 1000);
    });
}

 
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
(async function main() {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';
    const { log } = console;
    const usersData = await fetchData(apiURL);
    
    if (!usersData) return log('Failed to fetch data');

    const processedData = await processData(usersData);
    const userProxy = new Proxy(processedData[0], handler);

    log(`ID: ${userProxy.id}, Name: ${userProxy.name}`);
    userProxy.name = 'John Doe';

    const idGen = idGenerator();
    log(`Next IDs: ${idGen.next().value}, ${idGen.next().value}, ${idGen.next().value}`);
})();
