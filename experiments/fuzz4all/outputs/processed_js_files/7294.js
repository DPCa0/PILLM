 

function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const fibonacciSequence = fibonacciGenerator();

const fibonacciProxy = new Proxy(fibonacciSequence, {
    get(target, prop) {
        if (prop === 'next') {
            return target.next.bind(target);
        }
        throw new Error('Only "next" method is allowed');
    }
});

async function getFibonacciNumber(position) {
    if (position < 1) throw new Error('Position must be greater than 0');

    for (let i = 1; i < position; i++) {
        fibonacciProxy.next();
    }
    return fibonacciProxy.next().value;
}

(async () => {
    try {
        const result = await Promise.all([5, 10, 15, 20].map(pos => getFibonacciNumber(pos)));
        print('Fibonacci numbers at positions 5, 10, 15, 20:', result);
    } catch (error) {
        console.error('Error:', error);
    }
})();
