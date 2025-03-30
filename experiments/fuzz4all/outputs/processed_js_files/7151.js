 

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

 
async function fetchNumber(gen) {
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(gen.next().value);
        }, 1000);
    });

    let number = await promise;
    return number;
}

 
let target = {};
Reflect.defineProperty(target, 'status', {
    value: 'active',
    writable: true,
    configurable: true,
    enumerable: true
});

 
let handler = {
    get: function(obj, prop) {
        print(`Getting property ${prop}`);
        return Reflect.get(obj, prop);
    },
    set: function(obj, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(obj, prop, value);
    }
};

let proxy = new Proxy(target, handler);

(async () => {
    const gen = numberGenerator();
    proxy.number = await fetchNumber(gen);
    print(`Number from generator: ${proxy.number}`);  
    print(`Current status: ${proxy.status}`);          
})();
