 

 
const createLoggingProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    });
};

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fetchData = async (url) => {
    print(`Fetching data from ${url}...`);
     
    return new Promise((resolve) =>
        setTimeout(() => resolve(`Data from ${url}`), 1000)
    );
};

 
const main = async () => {
    const person = createLoggingProxy({ name: 'Alice', age: 30 });
    person.name = 'Bob';
    print(person.name);

    const fibonacci = fibonacciGenerator();
    print('Fibonacci numbers:', [...Array(5)].map(() => fibonacci.next().value));

    const { data: responseData } = { data: await fetchData('https://api.example.com') };
    print('Fetched:', responseData);
};

main().catch(console.error);
