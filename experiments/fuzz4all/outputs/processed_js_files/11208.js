 
function* fibonacciSequence(limit) {
    let [prev, current] = [0, 1];
    while (limit-- > 0) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}

 
async function fetchFibonacciSum(limit) {
    return new Promise((resolve) => {
        const sequence = [...fibonacciSequence(limit)];
        const sum = sequence.reduce((acc, val) => acc + val, 0);
        setTimeout(() => resolve(sum), 1000);   
    });
}

 
(async () => {
    try {
        const limit = 10;
        print(`Calculating the sum of the first ${limit} Fibonacci numbers...`);
        const sum = await fetchFibonacciSum(limit);
        print(`The sum is: ${sum}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

 
const user = {
    firstName: 'John',
    lastName: 'Doe',
};

const userProxy = new Proxy(user, {
    get(target, property) {
        print(`Accessing property '${property}': ${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
});

 
print(userProxy.firstName);  
userProxy.lastName = 'Smith';      
print(userProxy.lastName);   
