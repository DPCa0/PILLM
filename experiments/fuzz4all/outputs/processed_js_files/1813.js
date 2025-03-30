class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
  
    *[Symbol.iterator]() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    get(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const value = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, value);
        return value;
    }

    static async fetchOnlineData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }
}

const fib = new Fibonacci();
const iterator = fib[Symbol.iterator]();

print('First 10 Fibonacci numbers:');
for (let i = 0; i < 10; i++) {
    print(iterator.next().value);
}

print('Fibonacci number at position 10:', fib.get(10));

(async () => {
    const data = await Fibonacci.fetchOnlineData('https://api.example.com/data');
    print('Fetched data:', data);
})();
