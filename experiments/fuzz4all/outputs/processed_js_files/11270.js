 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property '${prop}' has been accessed.`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting value ${value} to property '${prop}'.`);
        return Reflect.set(...arguments);
    }
};

const targetObject = { 
    name: 'Advanced JS', 
    features: ['Proxy', 'Map', 'Generator', 'Async/Await'] 
};

const proxy = new Proxy(targetObject, handler);

 
const map = new Map();
map.set(proxy, 'Proxy Example');

function* featureGenerator() {
    yield* proxy.features;
}

 
async function printFeatures() {
    for await (let feature of featureGenerator()) {
        print(`Feature: ${feature}`);
    }
}

 
(async () => {
    print(map.get(proxy));
    proxy.name = 'Modified JS';
    print(proxy.name);
    await printFeatures();
})();
