class Fibonacci {
    *[Symbol.iterator]() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

(async function main() {
    const fib = new Fibonacci();
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            for (const num of fib) {
                if (num > 100) break;
                await new Promise(resolve => setTimeout(resolve, 100));
                yield num;
            }
        }
    };

    const data = new Proxy({}, {
        get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} does not exist`)
    });

    for await (const num of asyncIterable) {
        print(`Fibonacci: ${num}`);
        print(data.someProp);
        data[`prop${num}`] = num * num;
    }

    const newObj = Object.assign(Object.create(null), data);
    print('Final Object:', JSON.stringify(newObj, null, 2));
})();
