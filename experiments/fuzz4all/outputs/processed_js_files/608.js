 
 

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];  
    }
}

 
const fibonacciIterable = {
    [Symbol.iterator]: fibonacciGenerator
};

 
const fibonacciSet = new Set();

 
for (let num of fibonacciIterable) {
    fibonacciSet.add(num);
    print(num);
    if (fibonacciSet.size === 10) break;  
}

 
const fibonacciArray = Array.from(fibonacciSet, num => `Fibonacci: ${num}`);

print(fibonacciArray.join(', '));
