 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);
    return { data: "Sample Data", timestamp: new Date() };
}

 
function* dataGenerator() {
    const data = yield fetchData();
    print("Data received in generator:", data);
    yield data.data.toUpperCase();
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Accessing property '${String(prop)}'`);
        return Reflect.get(target, prop, receiver);
    }
};

const targetObject = {
    [Symbol('id')]: 1,
    name: "Proxy Target",
    description: "This is a description of the proxy target object."
};

const proxy = new Proxy(targetObject, handler);

 
(async () => {
    const gen = dataGenerator();
    const fetchDataPromise = gen.next().value;  
    const data = await fetchDataPromise;  
    gen.next(data);  

     
    print(proxy.name);
    print(proxy.description);

     
    const idSymbol = Object.getOwnPropertySymbols(targetObject)[0];
    print("Symbol property value:", Reflect.get(targetObject, idSymbol));
})();
