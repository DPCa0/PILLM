class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }
    
    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

const observable = new Observable();

function withLogging(fn) {
    return function(...args) {
        print(`Arguments: ${JSON.stringify(args)}`);
        const result = fn(...args);
        print(`Result: ${JSON.stringify(result)}`);
        return result;
    }
}

const fibonacci = withLogging(function* (n) {
    let a = 0, b = 1, temp;
    while (n >= 0) {
        yield a;
        temp = a;
        a = b;
        b = temp + b;
        n--;
    }
});

function asyncIterable(genFunc, n) {
    return {
        [Symbol.asyncIterator]: async function* () {
            const gen = genFunc(n);
            let result = gen.next();
            while (!result.done) {
                await new Promise(res => setTimeout(res, 1000));
                yield result.value;
                observable.notify(result.value);
                result = gen.next();
            }
        }
    };
}

const subscription = observable.subscribe((data) => {
    print(`Received data: ${data}`);
});

(async () => {
    for await (let num of asyncIterable(fibonacci, 10)) {
        print(`Fibonacci: ${num}`);
    }
    subscription();  
})();
