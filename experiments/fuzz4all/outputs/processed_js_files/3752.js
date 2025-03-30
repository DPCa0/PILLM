 

function* dataGenerator() {
    const data = ['first', 'second', 'third'];
    for (let item of data) {
        yield new Promise((resolve) => setTimeout(() => resolve(item), 1000));
    }
}

async function fetchData(generator) {
    const results = [];
    for await (let value of generator) {
        results.push(value);
    }
    return results;
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'secret') {
            throw new Error("Access denied");
        }
        return Reflect.get(...arguments);
    }
};

const targetObject = { first: 'Hello', second: 'world', secret: 'hidden' };
const proxyObject = new Proxy(targetObject, handler);

(async () => {
    print("Fetching data...");
    const generator = dataGenerator();
    const results = await fetchData(generator);
    print("Fetched data:", results);

    print("Accessing properties via Proxy:");
    try {
        print("first:", proxyObject.first);
        print("second:", proxyObject.second);
        print("secret:", proxyObject.secret);  
    } catch (e) {
        console.error(e.message);
    }
})();
