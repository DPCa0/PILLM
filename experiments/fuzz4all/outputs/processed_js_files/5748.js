 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function fetchFibonacciNumbers(count) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fibGen = fibonacci();
            const numbers = [];
            for (let i = 0; i < count; i++) {
                numbers.push(fibGen.next().value);
            }
            resolve(numbers);
        }, 1000);
    });
}

 
const loggingHandler = {
    get(target, property) {
        if (typeof target[property] === 'function') {
            return function (...args) {
                print(`Array method '${property}' called with arguments: ${JSON.stringify(args)}`);
                return target[property].apply(this, args);
            };
        }
        return target[property];
    }
};

 
(async function main() {
    try {
        const fibNumbers = await fetchFibonacciNumbers(10);
        
         
        const proxiedFibNumbers = new Proxy(fibNumbers, loggingHandler);

        print('Fibonacci Sequence:', proxiedFibNumbers);

         
        proxiedFibNumbers.push(89);
        proxiedFibNumbers.splice(2, 1);

        print('Modified Fibonacci Sequence:', proxiedFibNumbers);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
