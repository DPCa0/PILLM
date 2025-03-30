 

 
async function fetchData(url) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop === 'execute') {
            return function () {
                print('Execution intercepted!');
                return Reflect.apply(target[prop], this, arguments);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async execute() {
        const generator = dataGenerator(this.urls);
        for (const promise of generator) {
            print(await promise);
        }
    }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const fetcher = new Proxy(new DataFetcher(urls), handler);

 
fetcher.execute();
