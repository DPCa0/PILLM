 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get: function(target, property) {
        print(`Property '${property}' was accessed`);
        return target[property];
    }
};

const targetObject = { greeting: 'Hello', language: 'JavaScript' };
const proxyObject = new Proxy(targetObject, handler);

 
const { greeting, language } = proxyObject;
print(`${greeting}, ${language}!`);

 
function* dataIterator(data) {
    for (const item of data) {
        yield item;
    }
}

 
(async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(apiUrl);
    if (data) {
        const iterator = dataIterator(data);
        for (let i = 0; i < 5; i++) {
            const item = iterator.next().value;
            if (item) print(`Post ${item.id}: ${item.title}`);
        }
    }
})();
