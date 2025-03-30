 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);
    return { data: "Important Data", timestamp: new Date() };
}

 
function* dataGenerator() {
    yield "Start";
    yield* fetchDataAsync();  
    yield "End";
}

 
async function* fetchDataAsync() {
    const data = await fetchData();
    yield data;
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
        return undefined;
    }
};

 
async function main() {
     
    const dataObj = new Proxy({}, handler);

    for await (let value of dataGenerator()) {
        if (typeof value === 'object') {
            Object.assign(dataObj, value);
        } else {
            print(value);
        }
    }

     
    print("Fetched Data:", dataObj.data);
    print("Timestamp:", dataObj.timestamp);
}

main();
