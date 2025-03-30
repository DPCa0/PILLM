 

 
function* generateDataStream() {
    for (let i = 0; i < 5; i++) {
        yield `DataChunk${i}`;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property "${prop}"`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Set property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const dataStore = new Proxy({}, handler);

 
const UNIQUE_KEY = Symbol("uniqueKey");

 
async function processData() {
    const dataStream = generateDataStream();
    let result = dataStream.next();

    while (!result.done) {
        const dataChunk = result.value;
        print(`Processing: ${dataChunk}`);
        await new Promise(resolve => setTimeout(resolve, 1000));  
        dataStore[UNIQUE_KEY] = dataChunk;
        result = dataStream.next();
    }

    print("Processing complete", dataStore);
}

 
processData().then(() => print("All done!"));
