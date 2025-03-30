 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30, location: "Wonderland" });
        }, 1000);
    });
}

 
function* asyncFlow() {
    const data = yield fetchData();
    print(`Data fetched: Name - ${data.name}, Age - ${data.age}, Location - ${data.location}`);
}

 
async function runner(generator) {
    const iterator = generator();
    const handle = (result) => {
        if (result.done) return result.value;
        result.value.then(res => handle(iterator.next(res)));
    };
    handle(iterator.next());
}

 
const loggerHandler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Property '${prop}' set to '${value}'`);
        return Reflect.set(...arguments);
    }
};

 
(async function main() {
    const targetObject = { name: '', age: 0, location: '' };
    const proxiedObject = new Proxy(targetObject, loggerHandler);

     
    await runner(asyncFlow);

     
    const data = await fetchData();
    const { name, age, location } = data;
    Object.assign(proxiedObject, { name, age, location });

    print(`Final Proxied Object: ${JSON.stringify(proxiedObject)}`);
})();
