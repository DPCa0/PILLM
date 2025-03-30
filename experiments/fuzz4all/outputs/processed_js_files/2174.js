 

class Fetcher {
    async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

class Processor {
    constructor({ processFunction }) {
        this.processFunction = processFunction;
    }
    
    process(data) {
        return this.processFunction(data);
    }
}

const fetcher = new Fetcher();
const dataProcessor = new Processor({
    processFunction: (data) => {
        const filtered = data.filter(item => item.completed);
        return filtered.map(({ id, title }) => ({ id, title }));
    }
});

const handler = {
    get: (target, prop, receiver) => {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Calling method ${prop} with arguments: ${JSON.stringify(args)}`);
                return Reflect.apply(target[prop], receiver, args);
            }
        }
        return Reflect.get(target, prop, receiver);
    }
};

const proxiedFetcher = new Proxy(fetcher, handler);
const proxiedProcessor = new Proxy(dataProcessor, handler);

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const data = await proxiedFetcher.fetchData(url);
        const processedData = proxiedProcessor.process(data);
        print('Processed Data:', processedData);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
