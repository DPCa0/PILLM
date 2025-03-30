 

 
const fetchData = async (url) => {
    const response = await new Promise((resolve) => {
        setTimeout(() => resolve({ data: `Data from ${url}` }), 1000);
    });
    return response;
};

 
const CACHE = Symbol('cache');

 
class DataManager {
    constructor() {
        this[CACHE] = new Map();

         
        return new Proxy(this, {
            get: (target, prop) => {
                if (target[prop]) return target[prop];
                if (target[CACHE].has(prop)) {
                    print(`Cache hit for: ${prop}`);
                    return target[CACHE].get(prop);
                }
                print(`Cache miss for: ${prop}`);
                return undefined;
            },
            set: (target, prop, value) => {
                target[CACHE].set(prop, value);
                return true;
            }
        });
    }

     
    async load(url) {
        const { data } = await fetchData(url);
        this[url] = data;
        return data;
    }
}

 
(async () => {
    const manager = new DataManager();

    const url1 = 'https://api.example.com/resource1';
    const url2 = 'https://api.example.com/resource2';

     
    print(await manager.load(url1));  
    print(await manager.load(url2));  

     
    print(manager[url1]);  
    print(manager[url2]);  
})();
