 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator(limit, step) {
    for (let i = 0; i < limit; i++) {
        await delay(step * i);
        yield `Step ${i}: Delayed by ${step * i}ms`;
    }
}

 
async function processGenerator() {
    const results = [];

     
    for await (let value of asyncGenerator(5, 500)) {
         
        const log = formatter `Result: ${value}`;
        results.push(log);
        print(log);
    }

     
    const [firstResult, ...otherResults] = results;

    print("\nSummary:");
    print("First Result:", firstResult);
    print("Other Results:", ...otherResults);
}

 
function formatter(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}${values[i] || ''}`, '').toUpperCase();
}

 
processGenerator();
