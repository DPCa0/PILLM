 
const factorial = (() => {
    const cache = {};
    return function f(n) {
        if (n in cache) return cache[n];
        if (n <= 1) return 1;
        return cache[n] = n * f(n - 1);
    };
})();

 
async function fetchNumberFact(number) {
    const response = await fetch(`http: 
    if (!response.ok) throw new Error('Network response was not ok.');
    const fact = await response.text();
    return fact;
}

 
const logger = new Proxy(console.log, {
    apply(target, thisArg, argumentsList) {
        const timestamp = new Date().toISOString();
        target.apply(thisArg, [timestamp, ...argumentsList]);
    }
});

 
async function* generateFactorialFacts(numbers) {
    for (const number of numbers) {
        const fact = await fetchNumberFact(number);
        yield `${number}! = ${factorial(number)}, Fact: ${fact}`;
    }
}

 
(async function() {
    const numbers = [3, 5, 7];
    for await (const fact of generateFactorialFacts(numbers)) {
        logger(fact);
    }
})();
