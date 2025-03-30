class ApiService {
    static #cache = new Map();

    static async fetchJson(url) {
        if (this.#cache.has(url)) {
            print('Serving from cache:', url);
            return this.#cache.get(url);
        }
        
        print('Fetching:', url);
        const response = await fetch(url);
        const data = await response.json();
        this.#cache.set(url, data);
        return data;
    }
}

const combineData = async (urls) => {
    const results = await Promise.all(urls.map(url => ApiService.fetchJson(url)));
    return results.reduce((acc, data) => ({ ...acc, ...data }), {});
};

const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
];

 
const handler = {
    get: (target, prop) => {
        print(`Accessing ${String(prop)} of combined data`);
        return target[prop];
    }
};

(async () => {
    const combinedData = await combineData(urls);
    const proxyData = new Proxy(combinedData, handler);

     
    const { data1, ...restData } = proxyData;

    print(data1);
    print(restData);
})();
