 

 
const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
});

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'https://api.example.com/data3';
}

 
const dataHandler = {
    get: async (target, prop, receiver) => {
        if (!(prop in target)) {
            target[prop] = await fetchData(prop);
        }
        return Reflect.get(target, prop, receiver);
    }
};

const proxiedData = new Proxy({}, dataHandler);

(async () => {
     
    const gen = urlGenerator();
    for await (let url of gen) {
        print(`Fetching: ${url}`);
         
        print(await proxiedData[url]);
    }
})();
