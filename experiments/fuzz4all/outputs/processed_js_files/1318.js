 

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

const targetObject = { 
    prop1: 'Hello', 
    prop2: 'World' 
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(proxy.prop1 + ' ' + proxy.prop2);
        }, 2000);
    });
    
    const result = await promise;
    return result;
}

 
const map = new Map();
map.set(1, 'data1');
map.set(2, 'data2');
map.set(3, 'data3');

 
function* mapEntries(map) {
    for (let entry of map) {
        yield entry;
    }
}

 
(async () => {
    print('Fetching Data...');
    const message = await fetchData();
    print(`Message: ${message}`);

    print('Iterating Map Entries:');
    const entriesGenerator = mapEntries(map);
    for (let entry of entriesGenerator) {
        print(`Key: ${entry[0]}, Value: ${entry[1]}`);
    }
})();
