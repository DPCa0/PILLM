 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchDataAsync() {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    for (let url of urls) {
        await delay(1000);  
        yield fetch(url).then(response => response.json());
    }
}

const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Getting property ${property}`);
            return target[property];
        }
        throw new Error(`Property ${property} does not exist.`);
    }
};

async function processAsyncData() {
    let proxyData = new Proxy({}, handler);

    for await (const data of fetchDataAsync()) {
        const { id, title, body } = data;
        Object.assign(proxyData, { [`post_${id}`]: { title, body } });
    }

    print(proxyData);
}

processAsyncData();
