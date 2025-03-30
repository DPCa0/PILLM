 
async function* fetchDataSimulator() {
    const dataChunks = ['Data Part 1', 'Data Part 2', 'Data Part 3'];
    for (const chunk of dataChunks) {
        yield new Promise(resolve => setTimeout(() => resolve(chunk), 1000));
    }
}

 
const target = {
    message: 'Hello, advanced JavaScript!'
};

const handler = {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
    }
};

const proxy = new Proxy(target, handler);

 
async function demonstrateAdvancedFeatures() {
    print('Starting data fetch simulation...');

     
    for await (const data of fetchDataSimulator()) {
        print(`Fetched: ${data}`);
    }

    print('Data fetch complete. Accessing proxy object...');

     
    print(proxy.message);

    print('Advanced JavaScript features demonstration complete.');
}

 
demonstrateAdvancedFeatures();
