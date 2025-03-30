class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
    
    *generate(n) {
        for (let i = 0; i < n; i++) {
            yield this._fibonacci(i);
        }
    }

    _fibonacci(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);

        const result = this._fibonacci(n - 1) + this._fibonacci(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

async function processFibonacciData() {
    const fib = new Fibonacci();
    const fibonacciNumbers = [...fib.generate(10)];
    
    print('First 10 Fibonacci numbers:', fibonacciNumbers);

    try {
        const data = await fetchData('https://api.example.com/data');
        print('Fetched data:', data);

        const processedData = fibonacciNumbers.map((num, idx) => ({
            fibonacci: num,
            apiData: data[idx] || null
        }));

        print('Processed Data:', processedData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

processFibonacciData();
