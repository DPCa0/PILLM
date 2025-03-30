 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
async function* dataPipeline(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Set property: ${prop} = ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const proxiedObj = new Proxy({ a: 1, b: 2 }, handler);

 
function logExecutionTime(target, property, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.time(property);
        const result = originalMethod.apply(this, args);
        console.timeEnd(property);
        return result;
    };
    return descriptor;
}

class ComplexOperations {
    @logExecutionTime
    compute(data) {
        return data.reduce((acc, val) => acc + val, 0);
    }
}

 
(async () => {
    const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];
    const pipeline = dataPipeline(urls);
    
    for await (const data of pipeline) {
        print(data);
    }

     
    print(proxiedObj.a);
    proxiedObj.b = 42;

     
    const operations = new ComplexOperations();
    print('Result:', operations.compute([1, 2, 3, 4, 5]));
})();
