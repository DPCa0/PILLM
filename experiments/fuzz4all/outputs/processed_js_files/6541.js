 

 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
function* requestGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        const result = Reflect.get(target, prop, receiver);
        if (prop === 'next') {
            print('Accessing next generator value...');
        }
        return result;
    }
};

 
(async function fetchAllData() {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
    const gen = requestGenerator(urls);
    const proxiedGen = new Proxy(gen, handler);

    let done = false;
    while (!done) {
        const { value, done: isDone } = proxiedGen.next();
        if (!isDone) {
            const data = await value;
            print(data);
        }
        done = isDone;
    }
})();
