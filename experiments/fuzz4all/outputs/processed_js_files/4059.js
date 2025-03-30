 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function delayedNumber(gen, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gen.next().value);
        }, delay);
    });
}

 
const numbersProxyHandler = {
    get: (target, property) => {
        print(`Accessing property ${property}`);
        return property in target ? target[property] : 42;  
    }
};

const numbers = {
    one: 1,
    two: 2,
    three: 3
};

 
const proxiedNumbers = new Proxy(numbers, numbersProxyHandler);

 
(async () => {
    const numGen = numberGenerator();

    for (let i = 0; i < 5; i++) {
         
        const num = await delayedNumber(numGen, 1000);
        print(`Generated number: ${num}`);
    }

    print(`Proxied number (three): ${proxiedNumbers.three}`);
    print(`Proxied number (nonexistent): ${proxiedNumbers.five}`);
})();
