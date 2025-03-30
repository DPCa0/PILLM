 

function* generateNumbers() {
    for (let i = 0; i < 5; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 500));
    }
}

async function consumeGenerator(gen) {
    const results = [];
    for await (let numPromise of gen) {
        const num = await numPromise;
        print(`Generated number: ${num}`);
        results.push(num);
    }
    return results;
}

async function main() {
    const numGen = generateNumbers();
    const results = await consumeGenerator(numGen);
    print('All numbers:', results);

     
    const squared = results.map(num => num ** 2);
    const sum = squared.reduce((acc, num) => acc + num, 0);
    print('Sum of squares:', sum);

     
    const handler = {
        get: (target, prop) => {
            print(`Accessing property "${prop}"`);
            return target[prop];
        }
    };

    const proxyObj = new Proxy({ sumOfSquares: sum, numbers: results }, handler);
    print('Sum via Proxy:', proxyObj.sumOfSquares);
}

main().catch(console.error);
