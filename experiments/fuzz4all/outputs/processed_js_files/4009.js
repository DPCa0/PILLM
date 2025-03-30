 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield new Promise(resolve => setTimeout(() => resolve(num++), 1000));
    }
}

 
async function consumeGenerator(gen) {
    for await (const promise of gen) {
        print(`Received number: ${await promise}`);
        if ((await promise) > 5) break;  
    }
}

 
const handler = {
    apply: (target, thisArg, argumentsList) => {
        print(`Intercepted function call: ${target.name}`);
        return target(...argumentsList);
    }
};

 
const proxiedConsume = new Proxy(consumeGenerator, handler);

 
function tagged(strings, ...values) {
    return strings.reduce((result, str, i) => {
        let val = values[i - 1];
        if (val instanceof Promise) {
            val = `Promise(${i})`;
        }
        return `${result}${val || ''}${str}`;
    });
}

 
const msg = tagged`Starting to consume numbers up to a limit of ${Promise.resolve(5)}...`;
print(msg);

 
const gen = numberGenerator();
proxiedConsume(gen);
