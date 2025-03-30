 

const complexObject = { 
    secret: 'hidden', 
    number: 42 
};

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

const proxiedObject = new Proxy(complexObject, handler);

 
function* promiseGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Third'), 3000));
}

 
async function processPromises(gen) {
    for (let p of gen) {
        const result = await p;
        print(result);
    }
}

(async () => {
    print(`The secret is: ${proxiedObject.secret}`);
    print(`The number is: ${proxiedObject.number}`);

    const gen = promiseGenerator();
    await processPromises(gen);

    print('All promises processed.');
})();
