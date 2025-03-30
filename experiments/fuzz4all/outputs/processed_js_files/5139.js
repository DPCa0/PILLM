 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);
    return { data: "Sample Data" };
}

 
function* dataGenerator() {
    const data = yield fetchData();
    yield `Processed ${data.data}`;
}

 
const handler = {
    get: (target, prop) => {
        print(`Property "${prop}" accessed`);
        return target[prop];
    }
};

 
const dataObject = new Proxy({ prop1: 42, prop2: "Hello" }, handler);

 
async function processFlow() {
    const gen = dataGenerator();
    const fetchPromise = gen.next().value;  
    const fetchedData = await fetchPromise;
    const processedData = gen.next(fetchedData).value;  
    print(processedData);
}

 
print(dataObject.prop1);
print(dataObject.prop2);

 
processFlow();
