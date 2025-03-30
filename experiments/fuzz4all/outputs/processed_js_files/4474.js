 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    await delay(1000);  
    return { data: 'Sample Data' };
}

 
function* dataGenerator() {
    let index = 0;
    while (true) {
        yield `Generated Data ${index++}`;
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const dataStore = new Proxy({ cache: [] }, loggingHandler);

(async function main() {
     
    const response = await fetchData();
    print('Fetched:', response.data);

     
    const generator = dataGenerator();
    for (let i = 0; i < 3; i++) {
        print(generator.next().value);
    }

     
    dataStore.cache.push(response.data);
    print('Current Cache:', dataStore.cache);
})();
