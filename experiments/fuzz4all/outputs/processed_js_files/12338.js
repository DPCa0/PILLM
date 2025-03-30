 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const proxyHandler = {
    get: (target, property) => {
        if (property === 'id') {
            return `Generated ID: ${target.id}`;
        }
        return target[property];
    }
};

const fetchData = async (url) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve(`Data from ${url}`) : reject('Failed to fetch data');
        }, 1000);
    });
};

const processAsyncTasks = async () => {
    try {
        const urls = ['https://api1.example.com', 'https://api2.example.com', 'https://api3.example.com'];
        const results = await Promise.all(urls.map(url => fetchData(url)));
        results.forEach(result => print(result));
    } catch (error) {
        console.error(error);
    }
};

(async () => {
    const objectWithID = { id: idGen.next().value, name: 'Test Object' };
    const proxiedObject = new Proxy(objectWithID, proxyHandler);
    
    print(proxiedObject.id);  
    print(proxiedObject.name);  

    await processAsyncTasks();
})();
