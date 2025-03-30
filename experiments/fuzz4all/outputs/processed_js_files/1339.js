 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print("Fetching data...");
    await delay(2000);
    return { data: { user: "John Doe", age: 30 } };
}

 
function* dataFlowManager() {
    const data = yield fetchData();
    print("Received data:", data);
    return data;
}

 
async function runGenerator(genFunc) {
    const iterator = genFunc();
    let result = iterator.next();

    while (!result.done) {
        result = iterator.next(await result.value);
    }
    
    return result.value;
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return prop in target ? target[prop] : "Property not found";
    }
};

 
const createDataProxy = async () => {
    const rawData = await runGenerator(dataFlowManager);
    return new Proxy(rawData.data, handler);
};

 
(async () => {
    const proxiedData = await createDataProxy();
    print(proxiedData.user);  
    print(proxiedData.age);  
    print(proxiedData.nonExistentProp);  
})();
