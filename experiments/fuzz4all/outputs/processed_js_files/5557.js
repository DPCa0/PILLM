Certainly! Here's a JavaScript program that showcases advanced features such as Promises, async/await, generators, and destructuring:

async function* asyncNumberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 100));
    }
}

async function sumNumbers(limit) {
    const asyncGen = asyncNumberGenerator(limit);
    let sum = 0;
    for await (const num of asyncGen) {
        sum += num;
        print(`Current number: ${num}, Running total: ${sum}`);
    }
    return sum;
}

const numbers = [3, 6, 9, 12];
const promiseArray = numbers.map(limit => sumNumbers(limit));

Promise.all(promiseArray)
    .then(sums => {
        const totalSum = sums.reduce((acc, current) => acc + current, 0);
        print(`Sum of all sequences: ${totalSum}`);
    })
    .catch(err => console.error(`Error: ${err}`));

This program generates sequences of numbers asynchronously using a generator function. It calculates the sum of each sequence concurrently using promises and async/await, then outputs the total sum of all sequences.