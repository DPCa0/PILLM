class Fibonacci {
    constructor(max) {
        this.max = max;
        this.memo = new Map();
    }
  
     
    *generate(n = 0, a = 0, b = 1) {
        if (n > this.max) return;
        yield a;
        if (!this.memo.has(n)) this.memo.set(n, a);
        yield* this.generate(n + 1, b, a + b);
    }

     
    [Symbol.iterator]() {
        return this.generate();
    }

    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Fetching error:", error);
        }
    }
}

(async () => {
     
    const fib = new Fibonacci(10);
    for (const num of fib) {
        print(num);
    }

     
    const data = await Fibonacci.fetchData('https://api.github.com/users/octocat');
    if (data) {
        print(`GitHub user: ${data.login}`);
    }
})();
