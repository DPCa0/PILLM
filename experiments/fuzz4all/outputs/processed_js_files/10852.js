 

 
const secretKey = Symbol('secret');

 
const handler = {
    get: (target, prop) => {
        if (prop === secretKey) {
            return target[prop];
        }
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        }
        return `Property '${prop}' does not exist`;
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
const data = {
    [secretKey]: 'This is a secret!',
    name: 'Alice',
    age: 30
};

 
const proxyData = new Proxy(data, handler);

 
async function* asyncGenerator() {
    let index = 0;
    while (index < 3) {
        yield new Promise((resolve) => setTimeout(() => resolve(proxyData.age + index++), 1000));
    }
}

 
async function fetchData() {
    const results = [];
    for await (const num of asyncGenerator()) {
        results.push(num);
    }
    print(`Fetched data: ${results}`);
}

 
(async () => {
    proxyData.name = 'Bob';
    print(proxyData.name);
    print(proxyData.nonExistentProperty);
    print(proxyData[secretKey]);   
    await fetchData();
})();
