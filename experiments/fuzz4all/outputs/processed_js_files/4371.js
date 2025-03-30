 

 
function* delayGenerator(ms, maxCount) {
    for (let count = 1; count <= maxCount; count++) {
        yield new Promise(resolve => setTimeout(() => resolve(count), ms));
    }
}

 
async function processGenerator(generator) {
    for (const promise of generator) {
        const value = await promise;
        print(`Processed value: ${value}`);
    }
}

 
const handler = {
    get: function (target, prop) {
        if (prop in target) {
            print(`Accessed property "${prop}" with value: ${target[prop]}`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    }
};

const originalObject = { a: 1, b: 2, c: 3 };
const proxyObject = new Proxy(originalObject, handler);

 
(async () => {
    const gen = delayGenerator(1000, 5);   
    await processGenerator(gen);

     
    print(`Proxy a: ${proxyObject.a}`);
    print(`Proxy b: ${proxyObject.b}`);
    print(`Proxy x: ${proxyObject.x}`);   
})();
