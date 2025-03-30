class NetworkRequest {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

async function processData(url) {
    const networkRequest = new NetworkRequest(url);
    const data = await networkRequest.fetchData();
    if (!data) return;

    const gen = idGenerator();
    const processedData = data.map(item => {
        return { ...item, uniqueId: gen.next().value };
    });

    console.table(processedData);
}

 
const arrayHandler = {
    get(target, property) {
        if (property === 'push') {
            return function (...args) {
                print(`Adding ${args.length} items.`);
                return Array.prototype.push.apply(target, args);
            };
        }
        return Reflect.get(target, property);
    }
};

 
(async function main() {
    const exampleUrl = 'https://jsonplaceholder.typicode.com/posts';
    await processData(exampleUrl);

    const proxyArray = new Proxy([], arrayHandler);
    proxyArray.push(1, 2, 3);
    print(proxyArray);
})();
