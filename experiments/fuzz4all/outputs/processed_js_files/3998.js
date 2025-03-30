 

 
function* dataGenerator() {
    yield { id: 1, value: 10 };
    yield { id: 2, value: 20 };
    yield { id: 3, value: 30 };
}

 
async function fetchData(generator) {
    const data = [];
    for (const item of generator) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        data.push(item);
    }
    return data;
}

 
function processData(data) {
    return data.map(({ id, value }) => ({ id, value: value * 2 }));
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    }
};

 
(async function main() {
    const generator = dataGenerator();
    const rawData = await fetchData(generator);
    const processedData = processData(rawData);

     
    const proxyData = new Proxy(processedData, handler);

     
    print(proxyData[0]);  
    print(proxyData[1].value);  
    print(proxyData[3]);  
})();
