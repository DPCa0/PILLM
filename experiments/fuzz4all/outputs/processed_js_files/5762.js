 

 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
async function fetchData(url) {
    await delay(1000);  
    return `Fetched data from ${url}`;
}

 
function* processData(data) {
    yield `Step 1: Parsing ${data}`;
    yield `Step 2: Analyzing ${data}`;
    yield `Step 3: Finalizing ${data}`;
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property ${prop}`);
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

 
const targetObject = {};
const proxyObject = new Proxy(targetObject, handler);

 
async function main() {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    
    const processSteps = processData(data);
    for (let step of processSteps) {
        print(step);
    }
    
    proxyObject.title = 'Advanced JavaScript';
    print(proxyObject.title);
    print(proxyObject.nonExistentProperty);
}

 
main();
