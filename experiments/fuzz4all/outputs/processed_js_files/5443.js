 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchDataInChunks() {
    const chunks = ['chunk1', 'chunk2', 'chunk3'];
    for (const chunk of chunks) {
        await delay(1000);  
        yield chunk;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Property ${prop} accessed`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property ${prop} set to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const dataStore = {
    result: null
};

 
const proxiedDataStore = new Proxy(dataStore, handler);

 
(async () => {
    let combinedData = '';

     
    for await (const chunk of fetchDataInChunks()) {
        print(`Received: ${chunk}`);
        combinedData += chunk + ' ';
    }

     
    proxiedDataStore.result = combinedData.trim();

     
    print(`Final Combined Data: ${proxiedDataStore.result}`);
})();
