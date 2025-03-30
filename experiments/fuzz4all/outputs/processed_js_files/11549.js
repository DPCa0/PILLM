 

function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

async function printFibonacciSequence(limit) {
    const fibonacci = fibonacciGenerator();
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        print(fibonacci.next().value);
    }
}

const handler = {
    set(target, key, value) {
        if (key === 'limit' && value > 20) {
            print('Limit set to maximum of 20.');
            target[key] = 20;
        } else {
            target[key] = value;
        }
        return true;
    }
};

const settings = new Proxy({ limit: 10 }, handler);

(async () => {
    settings.limit = 25;  
    await printFibonacciSequence(settings.limit);
})();
