 

 
function* dataGenerator() {
    yield fetchData(1000, 'Data A');
    yield fetchData(1500, 'Data B');
    yield fetchData(500, 'Data C');
}

 
function fetchData(delay, data) {
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

 
async function processData(generator) {
    for (let promise of generator) {
        const data = await promise;
        print(`Fetched: ${data}`);
    }
}

 
const target = {
    message: "Hello, Proxy!",
    secret: "This is hidden."
};

const handler = {
    get: (obj, prop) => {
        if (prop === 'secret') {
            return "Access Denied";
        } else {
            return Reflect.get(obj, prop);
        }
    }
};

 
const proxy = new Proxy(target, handler);

 
print(proxy.message);  
print(proxy.secret);   

const generator = dataGenerator();
processData(generator);
