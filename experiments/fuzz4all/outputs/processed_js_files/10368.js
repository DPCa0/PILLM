 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
    });
};

 
const createProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Getting property '${prop}'`);
            return Reflect.get(obj, prop);
        },
        set: (obj, prop, value) => {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(obj, prop, value);
        }
    });
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const idIterable = {
    [Symbol.iterator]: idGenerator
};

 
(async () => {
    const data = await fetchData();
    print('Fetched data:', data);

    const proxyObj = createProxy({ name: 'Test', count: 0 });
    proxyObj.name = 'New Test';
    print(proxyObj.name);

    for (let id of idIterable) {
        print(`Generated ID: ${id}`);
        if (id >= 5) break;  
    }
})();
