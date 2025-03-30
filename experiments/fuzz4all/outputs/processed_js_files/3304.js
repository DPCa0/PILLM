 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function asyncFibonacciSequence(n) {
    const fibGen = fibonacciGenerator();
    for (let i = 0; i < n; i++) {
        const fibNumber = fibGen.next().value;
        print(`Fibonacci #${i + 1}: ${fibNumber}`);
        await delay(1000);  
    }
}

 
(async () => {
    try {
        print("Starting Fibonacci Sequence:");
        
        const fibPromises = Array.from({ length: 5 }, (_, i) => asyncFibonacciSequence(5 + i));

        await Promise.all(fibPromises);
        
        print("Fibonacci Sequences Complete.");
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
