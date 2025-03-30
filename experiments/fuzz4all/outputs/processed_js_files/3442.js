 

 
const fetchData = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, data: `Data for ID: ${id}` });
        }, 1000);
    });
};

 
const cache = new Map();

 
const cacheHandler = {
    get: (target, prop) => {
        if (!target.has(prop)) {
            print(`Fetching data for ID: ${prop}`);
            target.set(prop, fetchData(prop));
        }
        return target.get(prop);
    }
};

 
const cachedFetch = new Proxy(cache, cacheHandler);

(async () => {
    const ids = [1, 2, 3, 1, 2, 3];
    for (const id of ids) {
        const dataPromise = cachedFetch[id];
        const data = await dataPromise;
        print(data);
    }
})();
