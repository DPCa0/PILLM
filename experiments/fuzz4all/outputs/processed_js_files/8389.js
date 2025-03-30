 

function* generateNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property '${prop}' does not exist.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = {
    asyncData: null,
    generator: generateNumbers()
};

const proxyObject = new Proxy(targetObject, handler);

async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Fetched data');
        }, 1000);
    });
}

async function executeAsyncTask() {
    proxyObject.asyncData = await fetchData();
    print(proxyObject.asyncData);

    let nextNumber = proxyObject.generator.next().value;
    print(`Generated number: ${nextNumber}`);

    nextNumber = proxyObject.generator.next().value;
    print(`Generated number: ${nextNumber}`);
}

executeAsyncTask();

