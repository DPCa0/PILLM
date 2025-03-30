 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Hello from API' }), 1000);
    });
}

 
function* messageGenerator() {
    yield 'Fetching data...';
    const data = yield fetchData();
    yield `Data received: ${data.data}`;
}

 
const handler = {
    apply: async (target, thisArg, argumentsList) => {
        const iterator = target(...argumentsList);
        let result = iterator.next();
        print(result.value);  

        while (!result.done) {
            if (result.value instanceof Promise) {
                result.value = await result.value;
            }
            result = iterator.next(result.value);
            if (!result.done) {
                print(result.value);  
            }
        }
    }
};

 
const proxiedGenerator = new Proxy(messageGenerator, handler);

 
proxiedGenerator();
