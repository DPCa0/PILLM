class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    *sequence(n) {
        for (let i = 0; i < n; i++) {
            yield this.get(i);
        }
    }

    get(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const val = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, val);
        return val;
    }
}

const asyncFetch = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

(async () => {
    try {
        const fib = new Fibonacci();
        print([...fib.sequence(10)]);

        const data = await asyncFetch('https://jsonplaceholder.typicode.com/posts/1');
        const { userId, title, body } = data;
        print(`Post by user ${userId}: ${title}\n${body}`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
