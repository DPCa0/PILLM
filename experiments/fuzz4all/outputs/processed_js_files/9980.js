class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    *generate(n) {
        for (let i = 0; i < n; i++) {
            yield this.get(i);
        }
    }

    get(n) {
        if (!this.memo.has(n)) {
            const value = this.get(n - 1) + this.get(n - 2);
            this.memo.set(n, value);
        }
        return this.memo.get(n);
    }
}

const asyncFetch = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        url === "https://api.example.com/data"
            ? resolve({ data: "Hello, Async/Await!" })
            : reject(new Error("Not found"));
    }, 1000);
});

(async function main() {
    const fib = new Fibonacci();
    print("Fibonacci sequence:");

    for (let num of fib.generate(10)) {
        print(num);
    }

    try {
        const response = await asyncFetch("https://api.example.com/data");
        print(response.data);
    } catch (error) {
        console.error(error.message);
    }
})();
