 

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield new Promise((resolve) => setTimeout(() => resolve(num++), 1000));
    }
}

 
async function consumeGenerator(gen, limit = 5) {
    let results = [];
    let iteration = 0;
    for await (let numberPromise of gen) {
        const number = await numberPromise;
        results.push(number);
        print(`Generated number: ${number}`);
        if (++iteration >= limit) break;
    }
    return results;
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            print(`Property ${property} not found.`);
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = {};
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
    const gen = numberGenerator();
    const numbers = await consumeGenerator(gen);

    numbers.forEach(num => {
        proxyObject[num] = num * 2;  
    });

    print(proxyObject[1]);  
    print(proxyObject[100]);  
})();
