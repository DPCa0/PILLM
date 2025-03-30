 

 
function* dataStreamGenerator() {
    const dataChunks = ['Hello', ' ', 'world', '!'];
    for (let chunk of dataChunks) {
        yield new Promise(resolve => setTimeout(() => resolve(chunk), 500));
    }
}

 
async function fetchData() {
    let data = '';
    for await (let chunkPromise of dataStreamGenerator()) {
        data += chunkPromise;
    }
    return data;
}

 
const logger = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

async function run() {
    const dataContainer = new Proxy({}, logger);
    
     
    dataContainer.message = await fetchData();

     
    print(dataContainer.message);
}

run().catch(console.error);
