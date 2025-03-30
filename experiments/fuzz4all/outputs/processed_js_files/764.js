 
async function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property ${String(prop)}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const config = new Proxy({ threshold: 10, enableFeatureX: true }, handler);

 
function fetchConfigProperty(propertyName) {
    return config?.[propertyName] ?? 'default';
}

 
(async () => {
    print(fetchConfigProperty('threshold'));  

    config.enableFeatureX = false;

     
    for await (const num of fibonacciSequence()) {
        print(num);
        if (num > 50) break;
    }
})();
