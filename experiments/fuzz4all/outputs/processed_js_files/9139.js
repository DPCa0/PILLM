 

 
function* dataGenerator() {
    let id = 1;
    while (true) {
        yield { id: id++, data: `Data${id}` };
    }
}

 
async function fetchDataAsync(generator) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generator.next().value;
}

 
const dataHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
async function main() {
    const generator = dataGenerator();
    const dataStore = {};

    const proxyStore = new Proxy(dataStore, dataHandler);

     
    for (let i = 0; i < 3; i++) {
        const data = await fetchDataAsync(generator);
        proxyStore[data.id] = data;
    }

     
    print(proxyStore[1]);
    print(proxyStore[2]);
    print(proxyStore[3]);
}

main();
