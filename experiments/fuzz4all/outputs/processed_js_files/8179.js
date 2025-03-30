 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: 'John Doe', id: 12345 };
            resolve(data);
        }, 1000);
    });
}

 
async function displayData() {
    print('Fetching data...');
    try {
        const data = await fetchData();
        print('Data received:', data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
function* dataGenerator() {
    yield { item: 'apple', quantity: 5 };
    yield { item: 'banana', quantity: 10 };
    yield { item: 'cherry', quantity: 15 };
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxiedData = new Proxy({}, handler);

 
async function start() {
    await displayData();

    print('\nIterating over generated data:');
    const generator = dataGenerator();
    for (const data of generator) {
        print(data);
    }

    print('\nInteracting with proxied data:');
    proxiedData.name = 'Sample Object';
    print(proxiedData.name);
}

start();
