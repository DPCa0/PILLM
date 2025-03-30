 
const fibonacci = (function() {
    const memo = new Map();
    return function fib(n) {
        if (memo.has(n)) return memo.get(n);
        if (n <= 1) return n;
        const result = fib(n - 1) + fib(n - 2);
        memo.set(n, result);
        return result;
    };
})();

 
async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const fibResults = data.numbers.map(num => fibonacci(num));
        print('Fetched and processed Fibonacci sequence:', fibResults);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const iterableFibonacci = {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
};

 
const fibIter = iterableFibonacci[Symbol.iterator]();
print('First 10 Fibonacci numbers:', Array.from({length: 10}, () => fibIter.next().value));

 
const person = { name: 'Jane', age: 28, occupation: 'Developer' };
const introduce = ({name, age, occupation}) => 
    `Hello, my name is ${name}, I am ${age} years old and I work as a ${occupation}.`;
print(introduce(person));

 
fetchAndProcessData('https://api.example.com/numbers');
