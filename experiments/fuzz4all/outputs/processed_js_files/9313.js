 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData() {
    let id = 1;
    while (id <= 3) {
         
        await delay(1000);
        yield { id, data: `Data for ID: ${id++}` };
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    }
};

 
const targetObject = { message: "Proxy in Action!", value: 42 };
const proxy = new Proxy(targetObject, handler);

(async () => {
    print(proxy.message);  
    
    const asyncIterator = fetchData();
    for await (const item of asyncIterator) {
        print(item);
    }
})();
