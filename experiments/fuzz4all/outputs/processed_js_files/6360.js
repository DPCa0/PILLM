 

 
function* generateAsyncValues() {
    yield new Promise(resolve => setTimeout(() => resolve(10), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(20), 500));
    yield new Promise(resolve => setTimeout(() => resolve(30), 800));
}

 
async function runGenerator(genFunc) {
    const asyncIterator = genFunc();
    const results = [];

    for await (const value of asyncIterator) {
        results.push(value);
    }

    return results;
}

 
async function processNumbers(...numbers) {
    const [first, second, ...rest] = numbers;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
    print(`Sum: ${sum}`);
}

 
async function main() {
    const numbers = await runGenerator(generateAsyncValues);
    await processNumbers(...numbers);

     
    const squaredNumbers = await Promise.all(numbers.map(async (num) => {
        return num * num;
    }));

    print('Squared Numbers:', squaredNumbers);
}

main().catch(console.error);
