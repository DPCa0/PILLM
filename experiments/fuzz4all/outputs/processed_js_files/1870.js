 

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

 
const generateId = idGenerator();

 
const uniqueIds = new Set();

 
async function generateUniqueId() {
    return new Promise(resolve => {
        setTimeout(() => {
            const newId = generateId.next().value;
            uniqueIds.add(newId);
            resolve(newId);
        }, 100);
    });
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const target = {
    name: "Advanced JavaScript",
    version: 1.0
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
    proxy.name = "Complex JavaScript";

    print(`Program: ${proxy.name}, Version: ${proxy.version}`);

    const id1 = await generateUniqueId();
    print(`Generated unique ID: ${id1}`);

    const id2 = await generateUniqueId();
    print(`Generated unique ID: ${id2}`);

    print(`All unique IDs: ${Array.from(uniqueIds).join(', ')}`);
})();
