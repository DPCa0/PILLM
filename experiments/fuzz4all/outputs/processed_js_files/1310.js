 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
function* dataGenerator() {
    const urls = ['url1', 'url2', 'url3'];
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
async function processData(generator) {
    const dataIterator = generator();
    let result = dataIterator.next();
    while (!result.done) {
        const data = await result.value;
        print(`Received: ${data}`);
        result = dataIterator.next();
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const dataObject = {
    name: 'AdvancedJS',
    description: 'Complex JS program',
};

 
const proxyData = new Proxy(dataObject, handler);

 
proxyData.version = 1.0;
print(proxyData.name);

(async () => {
    print('Processing data...');
    await processData(dataGenerator);
    print('Processing complete.');
})();
