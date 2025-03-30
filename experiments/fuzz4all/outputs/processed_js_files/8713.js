 

function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const delayedPromise = (val, delay) => new Promise(resolve => setTimeout(() => resolve(val), delay));

async function displayNumbers(generator) {
    for await (let num of generator) {
        print(`Number: ${num}`);
        await delayedPromise(null, 1000);
        if (num >= 5) break;
    }
}

const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property "${prop}":`, obj[prop]);
            return obj[prop];
        } else {
            console.warn(`Property "${prop}" does not exist on target.`);
            return undefined;
        }
    }
};

const targetObject = {
    name: "AdvancedJS",
    version: "1.0"
};

const proxyObject = new Proxy(targetObject, handler);

(async () => {
    proxyObject.name;
    proxyObject.nonExistentProperty;

    const gen = numberGenerator();
    await displayNumbers(gen);
})();
