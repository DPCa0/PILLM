class Fibonacci {
    constructor() {
        this.memo = new Proxy({}, {
            get: (target, prop) => prop in target ? target[prop] : (target[prop] = this.calc(prop))
        });
    }

    calc(n) {
        if (n <= 1) return n;
        return this.memo[n - 1] + this.memo[n - 2];
    }

    *[Symbol.iterator]() {
        let i = 0;
        while (true) {
            yield this.memo[i++];
        }
    }
}

const fib = new Fibonacci();
const result = [...fib].slice(0, 10);
print(result);

async function fetchAndCompute(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const computation = data.reduce((acc, val) => acc + val, 0);
        return `The sum is: ${computation}`;
    } catch (error) {
        console.error('Error fetching or computing:', error);
    }
}

(async () => {
    const message = await fetchAndCompute('https://api.example.com/numbers');
    print(message);
})();

Promise.allSettled([
    Promise.resolve('First'),
    Promise.reject('Second'),
    Promise.resolve('Third')
]).then(results => {
    results.forEach(({status, value, reason}, i) => {
        print(`Promise ${i}: ${status} - ${value || reason}`);
    });
});

function taggedTemplate(strings, ...expressions) {
    return strings.reduce((acc, str, i) => acc + str + (expressions[i] || ''), '').toUpperCase();
}

const name = 'world';
print(taggedTemplate`Hello, ${name}! How's it going?`);
