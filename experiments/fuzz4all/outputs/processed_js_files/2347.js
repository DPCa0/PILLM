 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

 
const retryOperation = (operation, retries = 3) => {
    return async function attempt(...args) {
        try {
            return await operation(...args);
        } catch (error) {
            if (retries <= 0) throw new CustomError('Operation failed after multiple retries');
            return attempt(...args, retries - 1);
        }
    };
};

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

 
(async () => {
    const url = 'https://api.example.com/data';
    const fetchWithRetry = retryOperation(fetchData);

    try {
        const data = await fetchWithRetry(url);
        print('Data fetched:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();

 
const demonstrateCollections = () => {
     
    const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5]);
    print('Unique Numbers:', [...uniqueNumbers]);

     
    const fruitColorMap = new Map([
        ['apple', 'red'],
        ['banana', 'yellow'],
        ['grape', 'purple']
    ]);

    fruitColorMap.set('orange', 'orange');
    print('Fruit Colors:', Object.fromEntries(fruitColorMap));
};

demonstrateCollections();

 
const targetObject = { message: 'Hello, Proxy!' };

const handler = {
    get(target, property, receiver) {
        print(`Property '${property}' accessed on target:`, target);
        return Reflect.get(target, property, receiver);
    }
};

const proxiedObject = new Proxy(targetObject, handler);
print(proxiedObject.message);
