 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: 'Data fetched from ' + url };
            resolve(data);
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        print(`Property "${prop}" does not exist. Redirecting to fetch...`);
        return async () => {
            const result = await fetchData(`https: 
            target[prop] = result.message;   
            return target[prop];
        };
    }
};

 
const dataHandler = new Proxy({}, handler);

 
(async () => {
    print(await dataHandler.userInfo);  
    print(await dataHandler.userInfo);  
    print(await dataHandler.productDetails);  
})();

 
(async () => {
    const results = await Promise.all([
        dataHandler.orders(),
        dataHandler.notifications()
    ]);

    results.forEach(result => print(result));
})();
