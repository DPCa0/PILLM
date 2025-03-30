class Fibonacci {
    constructor(max) {
        this.max = max;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let a = 0, b = 1;
        while (a <= this.max) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

(async () => {
    try {
        const fibonacciSeq = new Fibonacci(100);
        const fibs = [...fibonacciSeq];
        print('Fibonacci Sequence:', fibs);
        
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched Data:', data);
        
        const doubleFibs = fibs.map(n => n * 2);
        print('Doubled Fibonacci Sequence:', doubleFibs);
        
        const fibSum = fibs.reduce((acc, val) => acc + val, 0);
        print('Sum of Fibonacci Sequence:', fibSum);

    } catch (error) {
        console.error('Error:', error);
    }
})();
