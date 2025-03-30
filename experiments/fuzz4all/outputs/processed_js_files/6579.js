 
async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
    ];

    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            print(`Property ${property} not found`);
            return undefined;
        }
    }
};

(async function() {
    const proxy = new Proxy({}, handler);

    for await (const data of fetchData()) {
        Object.assign(proxy, data);
        print(proxy.title);  
    }

    print(proxy.nonExistent);  
})();
