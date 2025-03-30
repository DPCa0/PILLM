 
 

function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function asyncNumberPrinter(generator, count) {
    for (let i = 0; i < count; i++) {
        const { value } = generator.next();
        print(`Number: ${value}`);
        await delay(500);
    }
}

const handler = {
    get: (obj, prop) => {
        if (prop === 'nextNumber') {
            return obj.generator.next().value;
        }
        return obj[prop];
    }
};

const generator = numberGenerator();
const proxiedGenerator = new Proxy({ generator }, handler);

async function main() {
    print(`Next Number via Proxy: ${proxiedGenerator.nextNumber}`);
    await asyncNumberPrinter(generator, 5);
    print(`Another Number via Proxy: ${proxiedGenerator.nextNumber}`);
}

main();
