class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [a, b, index] = [0, 1, 0];
        while (index < this.limit) {
            yield a;
            [a, b] = [b, a + b];
            index++;
        }
    }

    get(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        const result = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const fibonacciSequence = new Fibonacci(10);
print("Fibonacci Sequence:");
for (const num of fibonacciSequence) {
    print(num);
}

print("Fibonacci using Memoization:");
print(fibonacciSequence.get(9));
print(fibonacciSequence.get(10));

 
async function asyncAdd(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof x !== 'number' || typeof y !== 'number') {
                reject('Inputs must be numbers');
            } else {
                resolve(x + y);
            }
        }, 1000);
    });
}

(async () => {
    try {
        const result = await asyncAdd(5, 7);
        print("Result of Async Add:", result);
    } catch (error) {
        console.error("Error:", error);
    }
})();

 
const target = {
    message1: "hello",
    message2: "everyone"
};

const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'message1') {
            return Reflect.get(target, prop).toUpperCase();
        }
        return Reflect.get(target, prop);
    }
};

const proxy = new Proxy(target, handler);
print(proxy.message1);  
print(proxy.message2);  
