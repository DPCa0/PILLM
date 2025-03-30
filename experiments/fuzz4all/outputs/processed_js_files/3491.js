 
function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

function calculateFibonacci(limit) {
    return new Promise((resolve) => {
        const sequence = [];
        const gen = fibonacciGenerator(limit);
        let next = gen.next();
        while (!next.done) {
            sequence.push(next.value);
            next = gen.next();
        }
        resolve(sequence);
    });
}

async function displayFibonacci(limit) {
    try {
        const fibSequence = await calculateFibonacci(limit);
        print(`Fibonacci sequence up to ${limit}:`, fibSequence);
    } catch (error) {
        console.error('Error calculating Fibonacci sequence:', error);
    }
}

 
const objectArray = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' }
];

const [, { name: secondName }, ...rest] = objectArray;
const newArray = [...rest.map(({ name }) => name.toUpperCase())];

print('Second name:', secondName);
print('Rest names in uppercase:', newArray);

 
displayFibonacci(100);
