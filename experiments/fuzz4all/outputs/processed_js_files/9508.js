 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
    for (let i = 1; i <= 5; i++) {
        await delay(1000);  
        yield `Yielded value ${i}`;
    }
}

async function runAsyncGenerator() {
    const values = [];
    for await (const value of asyncGenerator()) {
        print(value);
        values.push(value);
    }
    return values;
}

function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function main() {
    print("Starting async generator...");
    const asyncValues = await runAsyncGenerator();

    print("\nGenerating Fibonacci sequence...");
    const fibSequence = Array.from(fibonacci(10));
    print(fibSequence);

    print("\nCombining results...");
    const combined = [...new Set([...asyncValues, ...fibSequence.map(n => `Fibonacci: ${n}`)])];
    print(combined);
}

main();
