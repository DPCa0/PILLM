const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciSequence(max) {
    let [prev, curr] = [0, 1];
    while (curr <= max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await delay(100);
    }
}

async function main() {
    const maxNumber = 1000;
    print(`Fibonacci sequence up to ${maxNumber}:`);
    
    try {
        for await (let num of fibonacciSequence(maxNumber)) {
            print(num);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().finally(() => print("Sequence generation complete."));
