 

 
function* dataGenerator() {
    yield 'Data 1';
    yield 'Data 2';
    yield 'Data 3';
}

 
async function fetchDataAsync(generator) {
    const dataArray = [];
    for (let value of generator) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        print('Fetched:', value);
        dataArray.push(value);
    }
    return dataArray;
}

 
const loggerHandler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const dataStore = new Proxy({}, loggerHandler);

 
async function main() {
    const generator = dataGenerator();
    
     
    const data = await fetchDataAsync(generator);
    
     
    data.forEach((value, index) => {
        dataStore[`item${index + 1}`] = value;
    });

    print('DataStore Contents:', dataStore.item1, dataStore.item2, dataStore.item3);
}

 
main();
