const asyncOperation = (value) => new Promise((resolve) => setTimeout(() => resolve(value * 2), 100));

const processValues = async (...values) => {
    const results = await Promise.all(values.map(async value => {
        if (typeof value !== 'number') {
            throw new TypeError('All inputs must be numbers');
        }
        let result = await asyncOperation(value);
        if (result > 10) {
            result = await asyncOperation(result);
        }
        return result;
    }));

    return results.reduce((acc, val) => acc + val, 0);
};

const executeComplexProcess = async () => {
    try {
        const inputs = [1, 2, 3, 4, 5];
        const sum = await processValues(...inputs);
        print(`Final Sum: ${sum}`);

         
        const handler = {
            get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} does not exist`
        };
        
        const target = { a: 1, b: 2, c: 3 };
        const proxy = new Proxy(target, handler);

        print(proxy.a);  
        print(proxy.d);  
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

executeComplexProcess();
