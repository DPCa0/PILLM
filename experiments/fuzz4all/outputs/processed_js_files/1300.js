class FibonacciGenerator {
    *generate(n) {
        let [a, b] = [0, 1];
        for (let i = 0; i < n; i++) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

const fib = new FibonacciGenerator();

 
const fibProxy = new Proxy(fib.generate(10), {
    get: (target, prop, receiver) => {
        if (prop === 'next') {
            print(`Accessing next Fibonacci number...`);
        }
        return Reflect.get(target, prop, receiver);
    }
});

 
(async () => {
    for await (let num of fibProxy) {
        print(num);
    }
})();

 
const myIterable = {
    [Symbol.iterator]: function* () {
        yield* fib.generate(5);
    }
};

print([...myIterable]);  

 
const [first, ...rest] = myIterable;
print('First:', first, 'Rest:', rest);

 
const config = {
    settings: {
        theme: 'dark'
    }
};

const theme = config.settings?.theme ?? 'light';
print('Theme:', theme);
