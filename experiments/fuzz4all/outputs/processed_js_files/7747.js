 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncCounter(max, interval) {
    for (let i = 1; i <= max; i++) {
        await delay(interval);
        yield i;
    }
}

 
async function processNumbers() {
    const results = [];

     
    await Promise.all([...asyncCounter(5, 500)].map(async (iterable) => {
        for await (let num of iterable) {
            print(`Processing number: ${num}`);
            results.push(num);
        }
    }));

     
    const squaredNumbers = results.map(num => num ** 2);
    const filteredNumbers = squaredNumbers.filter(num => num > 5);
    const sum = filteredNumbers.reduce((acc, num) => acc + num, 0);

    print(`Results: ${results}`);
    print(`Squared Numbers: ${squaredNumbers}`);
    print(`Filtered Numbers: ${filteredNumbers}`);
    print(`Sum of Filtered Numbers: ${sum}`);
}

 
processNumbers().catch(console.error);
