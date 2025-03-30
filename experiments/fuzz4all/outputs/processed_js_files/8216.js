 
const createLoggingProxy = (target) => new Proxy(target, {
    get(obj, prop) {
        print(`Getting property '${prop}'`);
        return Reflect.get(obj, prop);
    },
    set(obj, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(obj, prop, value);
    }
});

 
async function* asyncNumberGenerator() {
    let i = 0;
    while (i < 3) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

 
(async function() {
     
    const data = createLoggingProxy({ name: 'JavaScript', version: 2023 });

     
    print(data.name);
    data.version = 2024;

     
    const promises = [Promise.resolve('Success'), Promise.reject('Error'), Promise.resolve('Another Success')];
    const results = await Promise.allSettled(promises);
    results.forEach(({status, value, reason}) => print(status === 'fulfilled' ? value : reason));

     
    for await (let num of asyncNumberGenerator()) {
        print(`Async number: ${num}`);
    }

     
    const obj = { a: { b: null } };
    print(obj.a?.b ?? 'Default Value');  
})();
