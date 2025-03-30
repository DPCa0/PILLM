 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeData = { data: 'Sample Data from ' + url };
            resolve(fakeData);
        }, 1000);
    });
}

 
function* dataGenerator(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
async function asyncIterator(generator) {
    let result = generator.next();
    while (!result.done) {
        const value = await result.value;
        print('Fetched:', value.data);
        result = generator.next();
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' accessed with value: ${target[prop]}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Property '${prop}' set to value: ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const proxyTarget = { setting: true, version: '1.0.0' };
const proxyObject = new Proxy(proxyTarget, handler);

 
const urls = ['http://api.example.com/data1', 'http://api.example.com/data2'];
const generator = dataGenerator(urls);

(async () => {
    proxyObject.setting = false;   
    print(proxyObject.version);   
    await asyncIterator(generator);   
})();
