class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
}

const fibonacci = new FibonacciSequence(10);

 
const [first, second, ...rest] = [...fibonacci];
print(`First: ${first}, Second: ${second}`);
print(`Rest: ${rest.join(', ')}`);

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 42 }), 1000);
    });
}

async function processData() {
    const { data } = await fetchData();
    print(`Fetched Data: ${data}`);
}

processData();

 
const uniqueSquares = new Set([1, 2, 2, 3, 4, 4].map(x => x * x));
print(`Unique Squares: ${[...uniqueSquares].join(', ')}`);

 
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}<em>${values[i] || ''}</em>`, '');
}

const user = 'Alice';
print(highlight`Hello, ${user}! Welcome to the Fibonacci app.`);
