 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    try {
         
        print('Fetching data...');
        await delay(2000);  
        if (Math.random() > 0.5) throw new Error('Random fetch error occurred!');
        return { data: 'Sample data' };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  
    }
}

 
const dataProxyHandler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

 
function* dataProcessor() {
    try {
        const data = yield fetchData();
        const proxyData = new Proxy(data, dataProxyHandler);
        print('Processed Data:', proxyData.data);
    } catch (error) {
        print('Error in data processing:', error.message);
    }
}

 
(async function() {
    const processor = dataProcessor();
    const { value: fetchPromise } = processor.next();

    try {
        const fetchedData = await fetchPromise;
        processor.next(fetchedData);
    } catch (error) {
        processor.throw(error);
    }
})();

 
class Cache {
    constructor() {
        this.strongCache = new Map();
        this.weakCache = new WeakMap();
    }

    add(key, value, strong = true) {
        if (strong) {
            this.strongCache.set(key, value);
        } else {
            this.weakCache.set(key, value);
        }
    }

    get(key, strong = true) {
        return strong ? this.strongCache.get(key) : this.weakCache.get(key);
    }
}

 
const cache = new Cache();
const objKey = {};
cache.add('name', 'JavaScript', true);
cache.add(objKey, { details: 'Weakly Cached Data' }, false);

print('Strong Cache:', cache.get('name'));
console.log('Weak