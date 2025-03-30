 

 
const fetchData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({ data: 'Important data' });
    }, 1000);
});

 
function* dataGenerator() {
    yield 'First piece of data';
    yield fetchData();
    yield 'Third piece of data';
}

 
const handleData = async () => {
    const generator = dataGenerator();
    let result = generator.next();
    while (!result.done) {
         
        if (result.value instanceof Promise) {
            print(await result.value);
        } else {
            print(result.value);
        }
        result = generator.next();
    }
};

 
const handler = {
    get: (target, property, receiver) => {
        print(`Accessed property "${property}"`);
        return Reflect.get(target, property, receiver);
    }
};

 
const dataObject = {
    first: 'Hello',
    second: 'World'
};

 
const proxyObject = new Proxy(dataObject, handler);

 
(async () => {
    print(proxyObject.first);
    print(proxyObject.second);
    await handleData();
})();
