class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
    
    *generate(n) {
        for (let i = 0; i < n; i++) {
            yield this.fib(i);
        }
    }

    fib(n) {
        if (n < 2) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        
        const value = this.fib(n - 1) + this.fib(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

(async () => {
    const fibonacci = new Fibonacci();
    const sequence = fibonacci.generate(10);
    
    print('Fibonacci Sequence:');
    for (const num of sequence) {
        print(num);
    }

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        print('Fetched Data:', data.slice(0, 5));  
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
})();
