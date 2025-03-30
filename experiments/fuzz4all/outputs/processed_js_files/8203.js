 

class Fibonacci {
    *generate(n) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < n; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
}

const fibonacciHandler = {
    get(target, prop, receiver) {
        if (prop === 'sequence') {
            return async (n) => {
                const result = [];
                const generator = target.generate(n);
                for await (let num of generator) {
                    result.push(num);
                }
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const fibProxy = new Proxy(new Fibonacci(), fibonacciHandler);

(async () => {
    const sequenceLength = 10;
    const fibSequence = await fibProxy.sequence(sequenceLength);
    print(`Fibonacci sequence of length ${sequenceLength}:`, fibSequence);
})();
