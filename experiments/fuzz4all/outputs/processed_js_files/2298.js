 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const complexObj = {
    name: "Complex Object",
    value: 42,
    nested: {
        active: true
    },
};

const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property "${property}"`);
            return target[property];
        } else {
            console.warn(`Property "${property}" does not exist`);
            return undefined;
        }
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

const proxiedObj = new Proxy(complexObj, handler);

 
print(proxiedObj.name);  
proxiedObj.newProperty = "Hello Proxy!";  

 
const fibSequence = fibonacciGenerator();
const firstTenFib = [...Array(10)].map(() => fibSequence.next().value);
print(`First ten Fibonacci numbers: ${firstTenFib}`);

 
async function fetchData(urls) {
    const requests = urls.map(url => fetch(url));
    try {
        const responses = await Promise.all(requests);
        const dataPromises = responses.map(response => response.json());
        return await Promise.all(dataPromises);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
(async () => {
    const data = await fetchData(['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2']);
    print("Fetched data:", data);
})();
