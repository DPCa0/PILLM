 

const fetchData = async (url) => {
     
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
};

const cacheHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Cache hit for key: ${prop}`);
            return target[prop];
        } else {
            print(`Cache miss for key: ${prop}`);
            return undefined;
        }
    }
};

const cache = new Proxy({}, cacheHandler);

const apiUrl = 'https://api.example.com/data';
const promiseSet = new Set();

(async () => {
    const dataMap = new Map();

    for (let i = 0; i < 3; i++) {
        let promise = promiseSet[i];
        
        if (!cache[`response_${i}`]) {
            promise = fetchData(`${apiUrl}?query=${i}`).then(data => {
                cache[`response_${i}`] = data;
                dataMap.set(i, data);
            });
            promiseSet.add(promise);
        }
    }

    await Promise.all(promiseSet);

    for (let [key, value] of dataMap.entries()) {
        print(`Data for request ${key}:`, value);
    }
})();
