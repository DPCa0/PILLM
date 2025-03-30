 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function processNumbers(generator, limit = 10) {
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        print(`Generated number: ${generator.next().value}`);
    }
}

 
const targetObject = { message: "Hello, world!" };
const handler = {
    get: (target, prop, receiver) => {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    }
};
const proxiedObject = new Proxy(targetObject, handler);

 
(async () => {
    print(proxiedObject.message);
    const numGen = numberGenerator();
    await processNumbers(numGen);
})();
