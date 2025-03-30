 

 
async function* asyncGenerator() {
    let value = 0;
    while (value < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield value++;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop === Symbol.asyncIterator) {
            return () => target;
        }
        return target[prop];
    }
};

 
const proxiedGenerator = new Proxy(asyncGenerator(), handler);

(async () => {
    for await (let num of proxiedGenerator) {
        print(`Proxied Number: ${num}`);
    }
})();

 
const dynamicProperties = new Proxy({}, {
    get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} does not exist`,
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

 
dynamicProperties.firstName = 'John';
print(dynamicProperties.firstName);  
print(dynamicProperties.lastName);  
