 
async function* fetchPaginatedData(url) {
    let page = 1;
    while (true) {
        const response = await fetch(`${url}?page=${page}`);
        if (!response.ok) break;

        const data = await response.json();
        if (!data.items.length) break;

        yield data.items;
        page++;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
async function processData(url) {
    for await (const items of fetchPaginatedData(url)) {
        items.forEach(item => {
             
            const loggedItem = new Proxy(item, handler);
            print(`Item: ${JSON.stringify(loggedItem)}`);
        });
    }
}

 
processData('https://example.com/api/items');
