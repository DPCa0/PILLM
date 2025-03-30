 
const withErrorHandling = (fn) => (arg) => {
    try {
        return fn(arg);
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fetchData = async (url) => {
    if (url !== 'https://api.example.com/data') throw new Error('Invalid URL');
    return Promise.resolve({ data: [1, 2, 3, 4, 5] });
};

 
const compose = (...functions) => (args) =>
    functions.reduceRight((arg, fn) => fn(arg), args);

 
const loggerProxyHandler = {
    get(target, prop) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(target, prop);
    },
};

const person = new Proxy({ name: 'Alice', age: 30 }, loggerProxyHandler);

 
(async () => {
    const safeFetchData = withErrorHandling(fetchData);
    const data = await safeFetchData('https://api.example.com/data');

    if (data) {
        const fibGen = fibonacciGenerator();
        print('First 5 Fibonacci numbers:', [...Array(5)].map(() => fibGen.next().value));
        print('Fetched data:', data);

        const sum = (arr) => arr.reduce((a, b) => a + b, 0);
        const double = (arr) => arr.map((num) => num * 2);

        const processAndSumData = compose(sum, double);
        print('Processed sum:', processAndSumData(data.data));
    }

    print('Person\'s name:', person.name);
})();
