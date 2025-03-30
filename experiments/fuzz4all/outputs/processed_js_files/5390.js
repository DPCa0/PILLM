 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { message: 'Hello, world!', success: true };
        Math.random() > 0.5 ? resolve(data) : reject('Failed to fetch data');
    }, 1000);
});

 
async function* asyncGenerator() {
    try {
        const data = await fetchData();
        yield data.message;
    } catch (error) {
        yield error;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return Reflect.get(target, property);
    }
};

 
const obj = { hello: 'world' };

 
const proxyObj = new Proxy(obj, handler);

 
print(proxyObj.hello);

 
(async () => {
    const generator = asyncGenerator();
    for await (let value of generator) {
        print(value);
    }
})();
