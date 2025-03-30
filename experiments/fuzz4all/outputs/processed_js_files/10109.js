 

 
function* dataGenerator() {
    const dataChunks = ['Data 1', 'Data 2', 'Data 3'];
    for (const chunk of dataChunks) {
        yield new Promise(resolve => setTimeout(() => resolve(chunk), Math.random() * 1000));
    }
}

 
async function fetchData(gen) {
    let result = [];
    for (const promise of gen) {
        const data = await promise;
        result.push(data);
        print(`Fetched: ${data}`);
    }
    return result;
}

 
const dataHandler = {
    get(target, prop) {
        if (prop === 'length') {
            print(`Accessing length: ${target.length}`);
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting index ${prop} with value ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
(async () => {
    const generator = dataGenerator();
    const rawData = await fetchData(generator);
    
    const proxiedData = new Proxy(rawData, dataHandler);

     
    print(`Initial length: ${proxiedData.length}`);
    proxiedData.push('Data 4');
    print(`Updated length: ${proxiedData.length}`);
    print(`Final Data: ${proxiedData}`);
})();
