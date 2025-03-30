 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3, 4, 5]);
        }, 1000);
    });
};

 
function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

 
const processData = async () => {
    const data = await fetchData();
    const generator = dataGenerator(data);
    
    let result = 0;
    for (const value of generator) {
        result += value;
    }
    return result;
};

 
const handler = {
    get: (target, property) => {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

 
const dataObject = {
    description: "Data object with calculated sum",
    asyncSum: 0
};

 
const proxyObject = new Proxy(dataObject, handler);

(async () => {
     
    const sum = await processData();
    proxyObject.asyncSum = sum;
    
     
    print(`${proxyObject.description}: ${proxyObject.asyncSum}`);
})();
