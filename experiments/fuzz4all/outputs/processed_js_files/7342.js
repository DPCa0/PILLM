class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }
    
    *generateSeries() {
        let a = 0, b = 1;
        yield a;
        yield b;
        while (true) {
            [a, b] = [b, a + b];
            if (b > this.limit) break;
            yield b;
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
        const data = await fetchData('https://api.example.com/data');
        print('Fetched Data:', data);

        const fib = new Fibonacci(100);
        print('Fibonacci Series up to 100:');
        for (let num of fib.generateSeries()) {
            print(num);
        }

        const numbers = [1, 2, 3, 4, 5];
        const doubledNumbers = numbers.map(num => num * 2);
        print('Doubled Numbers:', doubledNumbers);

        const sum = doubledNumbers.reduce((acc, val) => acc + val, 0);
        print('Sum of Doubled Numbers:', sum);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
