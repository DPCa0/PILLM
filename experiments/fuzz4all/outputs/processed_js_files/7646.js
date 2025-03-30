 

 
function* dataGenerator() {
    yield Promise.resolve({ id: 1, value: "Data 1" });
    yield Promise.resolve({ id: 2, value: "Data 2" });
    yield Promise.resolve({ id: 3, value: "Data 3" });
}

 
async function fetchData(generator) {
    const data = [];
    for (let promise of generator) {
        data.push(await promise);
    }
    return data;
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property: ${property}`);
            return target[property];
        } else {
            console.warn(`Property ${property} not found`);
        }
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
(async () => {
     
    const generator = dataGenerator();
    const rawData = await fetchData(generator);

     
    const proxiedData = new Proxy(rawData, dataHandler);

     
    print(proxiedData[0]);  
    proxiedData[1] = { id: 2, value: "Modified Data 2" };  
    print(proxiedData[1]);  
    print(proxiedData[3]);  
})();
