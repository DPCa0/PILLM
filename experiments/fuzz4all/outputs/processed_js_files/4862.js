 

 
function* numberGenerator() {
    for (let i = 1; i <= 5; i++) {
        yield i;
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return target[property];
    }
};

 
const proxiedGenerator = new Proxy(numberGenerator, handler);

 
async function processNumber(num) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 1000);
    });
}

 
async function processGenerator(genFunc) {
    const generator = genFunc();
    for (let num of generator) {
        const result = await processNumber(num);
        print(`Processed number: ${result}`);
    }
}

 
processGenerator(proxiedGenerator).then(() => print('All numbers processed'));
