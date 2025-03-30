 
const calculate = (operation, ...numbers) => {
    const [a, b, ...rest] = numbers;
    switch (operation) {
        case 'add':
            return a + b + rest.reduce((acc, num) => acc + num, 0);
        case 'multiply':
            return a * b * rest.reduce((acc, num) => acc * num, 1);
        default:
            return null;
    }
};

 
async function* numberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
}

 
const performOperations = async () => {
    const numbers = [];
    for await (const num of numberGenerator(5)) {
        numbers.push(num);
    }

     
    const operationsHandler = {
        apply: (target, thisArg, argumentsList) => {
            print(`Operation: ${argumentsList[0]}, Numbers: ${argumentsList.slice(1)}`);
            return Reflect.apply(target, thisArg, argumentsList);
        }
    };

    const proxiedCalculate = new Proxy(calculate, operationsHandler);
    
    print("Addition Result:", proxiedCalculate('add', ...numbers));
    print("Multiplication Result:", proxiedCalculate('multiply', ...numbers));
};

 
performOperations();
