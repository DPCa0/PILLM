 

 
const uniqueKey = Symbol('unique');

 
const loggerProxy = obj => new Proxy(obj, {
    get(target, prop) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value);
    }
});

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
    });
}

 
(async function main() {
    const ids = idGenerator();
    const state = loggerProxy({
        [uniqueKey]: 'secretValue',
        data: null,
        id: ids.next().value
    });

    try {
        state.data = await fetchData();
        print(`Fetched Data: ${JSON.stringify(state.data)}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }

    print(`Current State ID: ${state.id}`);
    print(`Unique Property: ${state[uniqueKey]}`);
})();
