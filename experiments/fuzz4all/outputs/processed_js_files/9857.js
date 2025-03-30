 

 
const fetchData = (delay, result) => new Promise((resolve) => setTimeout(() => resolve(result), delay));

 
async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        const data = await fetchData(500, `Data ${i + 1}`);
        yield data;
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        }
        return `Property ${prop} does not exist`;
    },
    set: (obj, prop, value) => {
        print(`Setting property: ${prop} to value: ${value}`);
        obj[prop] = value;
        return true;
    }
};

 
const sampleObject = { name: 'JavaScript', version: 'ES2021' };
const proxyObject = new Proxy(sampleObject, handler);

 
(async () => {
    print('Start processing data...');
    for await (let data of asyncGenerator()) {
        print(`Received: ${data}`);
    }

    print('Modifying proxy object...');
    print(proxyObject.name);  
    proxyObject.language = 'Advanced JavaScript';  

    print('Proxy object:', proxyObject);
})();
