 

class FibonacciGenerator {
    constructor(maxSteps) {
        this.maxSteps = maxSteps;
        this.memo = new Map();
    }

     
    *generate() {
        let [a, b] = [0, 1];
        let count = 0;
        while (count < this.maxSteps) {
            yield a;
            [a, b] = [b, a + b];
            count++;
        }
    }

     
    fibonacci(n) {
        if (n < 2) return n;
        if (this.memo.has(n)) return this.memo.get(n);

        const value = this.fibonacci(n - 1) + this.fibonacci(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

(async () => {
    const fibGen = new FibonacciGenerator(10);

    print('Generated Fibonacci series using generator:');
    for (const num of fibGen.generate()) {
        print(num);
    }

    print('\nFibonacci number using recursion with memoization:');
    print(`Fibonacci(10) = ${fibGen.fibonacci(10)}`);

     
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Promise resolved after 2 seconds'), 2000);
    });

    try {
        const result = await promise;
        print(result);
    } catch (error) {
        console.error('Promise rejected:', error);
    }

     
    const handler = {
        get: (target, property) => {
            return property in target ? target[property] : `Property ${property} does not exist.`;
        }
    };

    const target = { foo: 'bar' };
    const proxy = new Proxy(target, handler);

    print('\nAccessing properties through a Proxy:');
    print(`proxy.foo = ${proxy.foo}`);
    print(`proxy.baz = ${proxy.baz}`);
})();
