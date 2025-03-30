 

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
async function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data for ID: ${id}`), 1000);
    });
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const dataHandler = new Proxy({}, handler);

 
async function processData() {
    const currentId = idGen.next().value;
    const data = await fetchData(currentId);
    dataHandler[currentId] = data;

    print(dataHandler[currentId]);
}

 
(async function() {
    await processData();
    await processData();
    await processData();
})();
