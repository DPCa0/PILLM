 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
    });
};

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
const createLoggingProxy = (generatorInstance) => {
    return new Proxy(generatorInstance, {
        get(target, prop, receiver) {
            if (prop === 'next') {
                print('Accessing next item...');
            }
            return Reflect.get(...arguments);
        }
    });
};

 
const main = async () => {
    print('Fetching data...');
    const dataArray = await fetchData();
    print('Data fetched:', dataArray);

    const dataGen = dataGenerator(dataArray);
    const proxiedDataGen = createLoggingProxy(dataGen);

    let result = proxiedDataGen.next();
    while (!result.done) {
        print('Processing:', result.value);
        result = proxiedDataGen.next();
    }
};

 
main().catch(console.error);
