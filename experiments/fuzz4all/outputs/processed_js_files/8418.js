 
const handler = {
    get(target, property) {
        print(`Getting property '${property}'`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
async function* fetchData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

 
(async () => {
    proxyObject.a = 42;  
    print(proxyObject.a);  

    const urls = [
        'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
        'https://api.github.com/repos/javascript-tutorial/en.javascript.info/issues'
    ];

    try {
        for await (const data of fetchData(urls)) {
            print('Received data:', data.slice(0, 1));  
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
