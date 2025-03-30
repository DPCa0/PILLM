 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            Math.random() > 0.2 ? resolve(`Data from ${url}`) : reject('Network Error');
        }, 1000);
    });
}

 
function* asyncGenerator() {
    try {
        const data1 = yield fetchData('https://api.example.com/endpoint1');
        print('First data:', data1);

        const data2 = yield fetchData('https://api.example.com/endpoint2');
        print('Second data:', data2);

        return 'All data fetched';
    } catch (error) {
        console.error('Error caught in generator:', error);
    }
}

 
async function runGenerator(genFunc) {
    const iterator = genFunc();

    async function handleResult(result) {
        if (result.done) return result.value;

        try {
            const resolvedValue = await result.value;
            return handleResult(iterator.next(resolvedValue));
        } catch (error) {
            return handleResult(iterator.throw(error));
        }
    }

    return handleResult(iterator.next());
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'fetchData') {
            print(`Fetching data with enhanced fetch: ${target[prop]}`);
            return new Proxy(target[prop], {
                apply(targetFunction, thisArg, argumentsList) {
                    if (!argumentsList[0]) {
                        throw new Error('URL is required');
                    }
                    print(`Making fetch request to: ${argumentsList[0]}`);
                    return Reflect.apply(targetFunction, thisArg, argumentsList);
                },
            });
        }
        return Reflect.get(target, prop, receiver);
    },
};

 
const enhancedOperations = new Proxy({ fetchData }, handler);

 
runGenerator(function* () {
    yield* asyncGenerator.call(enhancedOperations);
}).then((result) => print(result));
