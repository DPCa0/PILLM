 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchFibonacciSequence(limit) {
    return new Promise((resolve) => {
        const sequence = [];
        for (let num of fibonacci(limit)) {
            sequence.push(num);
        }
        resolve(sequence);
    });
}

 
(async function() {
    try {
        const sequence = await fetchFibonacciSequence(10);
        print('Fibonacci Sequence:', sequence);

         
        const uniqueValues = new Set(sequence);

         
        const squaredValues = [...uniqueValues].map(x => x ** 2);
        print('Squared Unique Values:', squaredValues);

         
        const sequenceObject = Object.fromEntries(squaredValues.map((value, index) => [`value${index + 1}`, value]));
        print('Sequence Object:', sequenceObject);
    } catch (error) {
        console.error('Error:', error);
    }
})();
