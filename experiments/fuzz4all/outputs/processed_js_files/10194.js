 

 
function* promiseGenerator() {
    yield new Promise((resolve) => setTimeout(() => resolve(1), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve(2), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve(3), 1000));
}

 
async function processPromises(gen) {
    for (let promise of gen) {
        print(await promise);
    }
}

 
const target = {
    message1: "Hello",
    message2: "World",
};

const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : "Property not found"),
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            obj[prop] = value.toUpperCase();
            return true;
        } else {
            throw new Error("Only strings are allowed");
        }
    }
};

const proxy = new Proxy(target, handler);

 
print(proxy.message1);  
proxy.message3 = "JavaScript";  
print(proxy.message3);  

 
processPromises(promiseGenerator());
