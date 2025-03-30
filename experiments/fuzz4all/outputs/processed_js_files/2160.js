(async function() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class Fibonacci {
        #memo = new Map();

        calculate(n) {
            if (this.#memo.has(n)) return this.#memo.get(n);
            if (n <= 1) return n;
            let value = this.calculate(n - 1) + this.calculate(n - 2);
            this.#memo.set(n, value);
            return value;
        }
    }

    const fibonacci = new Fibonacci();
    const cacheProxy = new Proxy(fibonacci, {
        get(target, prop) {
            if (prop === 'calculate') {
                return new Proxy(target[prop], {
                    apply(target, thisArg, argumentsList) {
                        print(`Calculating Fibonacci of ${argumentsList[0]}`);
                        return Reflect.apply(target, thisArg, argumentsList);
                    }
                });
            }
            return Reflect.get(target, prop);
        }
    });

    const asyncLogger = async (message) => {
        await delay(1000);
        print(message);
    };

    const promises = Array.from({ length: 10 }, (_, i) =>
        asyncLogger(`Fibonacci(${i}): ${cacheProxy.calculate(i)}`)
    );

    await Promise.all(promises);
})();
