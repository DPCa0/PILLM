 

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const data = {
    name: 'Advanced JS',
    value: 42
};

const proxy = new Proxy(data, handler);

 
function* generatorFunction() {
    yield 'First yield';
    yield 'Second yield';
    return 'Finished';
}

const gen = generatorFunction();

 
async function asyncTask() {
    for (let value of gen) {
        print(value);
    }
    proxy.name = 'Proxies are fun!';
    print(`Proxy name is now: ${proxy.name}`);

     
    const result = await new Promise(resolve => {
        setTimeout(() => resolve('Async/Await with Proxy'), 1000);
    });

    print(result);
}

 
asyncTask();
