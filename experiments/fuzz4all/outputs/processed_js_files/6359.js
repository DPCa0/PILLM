 
async function* fibonacci(limit) {
    let [a, b] = [0, 1];
    while (limit--) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (typeof prop === 'string' && !isNaN(prop)) {
            print(`Accessing index ${prop}`);
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    const fibSequence = [];
    const fibLimit = 10;

     
    for await (const num of fibonacci(fibLimit)) {
        fibSequence.push(num);
    }

     
    const proxyFibSequence = new Proxy(fibSequence, handler);

     
    function highlight(strings, ...values) {
        return strings.reduce((prev, curr, i) => `${prev}${curr}<b>${values[i] || ''}</b>`, '');
    }

     
    for (let i = 0; i < fibLimit; i++) {
        print(highlight`Fibonacci[${i}]: ${proxyFibSequence[i]}`);
    }
})();
