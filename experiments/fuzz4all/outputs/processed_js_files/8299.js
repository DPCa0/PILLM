 

function* fetchDataGenerator() {
    yield fetch('https://jsonplaceholder.typicode.com/posts/1')
              .then(response => response.json());
    yield fetch('https://jsonplaceholder.typicode.com/posts/2')
              .then(response => response.json());
}

async function handleData() {
    const generator = fetchDataGenerator();

    for (const promise of generator) {
        try {
            const data = await promise;
            print('Data received:', data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
}

const dataHandlerProxy = new Proxy(handleData, {
    apply(target, thisArg, argumentsList) {
        print('Data fetching initiated');
        return Reflect.apply(target, thisArg, argumentsList);
    }
});

dataHandlerProxy();
