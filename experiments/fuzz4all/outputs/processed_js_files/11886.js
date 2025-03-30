 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
async function* asyncGenerator(urls) {
    for (let url of urls) {
        yield await fetchData(url);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} with value: ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const targetObject = {
    prop1: 10
};

const proxy = new Proxy(targetObject, handler);
Reflect.set(proxy, 'prop2', 20);
print(Reflect.get(proxy, 'prop1'));

 
(async () => {
    const urls = ['http://example.com/data1', 'http://example.com/data2'];
    const gen = asyncGenerator(urls);

    for await (let value of gen) {
        print(`Fetched: ${value}`);
    }
})();
