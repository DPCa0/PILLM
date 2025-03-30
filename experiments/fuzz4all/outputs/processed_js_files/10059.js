class Fibonacci {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (;;) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
}

(async () => {
    const fibonacci = new Fibonacci();
    const sequence = Array.from(fibonacci).slice(0, 10);
    
    const doubled = sequence.map(n => n * 2);
    print("Doubled Fibonacci:", doubled);

    const filtered = sequence.filter(n => n % 2 === 0);
    print("Even Fibonacci:", filtered);

    const sum = await new Promise(resolve => {
        setTimeout(() => resolve(sequence.reduce((a, b) => a + b, 0)), 1000);
    });
    
    print("Sum of first 10 Fibonacci numbers:", sum);
})();
