 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
const loggerProxy = new Proxy({
    async fetchData(id) {
         
        return new Promise((resolve) => setTimeout(() => resolve(`Data for ${id}`), 1000));
    }
}, {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            print(`Method ${prop} was called`);
            return function (...args) {
                print(`Arguments: ${JSON.stringify(args)}`);
                return Reflect.apply(target[prop], target, args);
            }
        }
        print(`Property ${prop} was accessed`);
        return Reflect.get(target, prop, receiver);
    }
});

 
async function processNumbers(generator, dataProxy) {
    for (let i = 0; i < 5; i++) {
        const number = generator.next().value;
        print(`Generated number: ${number}`);

         
        const data = await dataProxy.fetchData(number);
        print(data);
    }
}

 
const gen = numberGenerator();
 
processNumbers(gen, loggerProxy).then(() => print("Processing complete."));
