 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

 
function* asyncGenerator() {
    print('Fetching data...');
    const data = yield fetchData();
    print(`Fetched data: ${data}`);
    print('Processing data...');
    const processedData = yield data * 10;
    print(`Processed data: ${processedData}`);
    yield processedData;
}

 
const runGenerator = async (genFunc) => {
    const generator = genFunc();
    let result = generator.next();
    
    while (!result.done) {
        const value = await result.value;
        result = generator.next(value);
    }
    return result.value;
};

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop);
    }
};

 
const target = {
    value: 42,
    message: 'Hello Proxy!',
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
    print(proxy.message);  

    const finalResult = await runGenerator(asyncGenerator);
    print(`Final Result: ${finalResult}`);
})();
