 

class Fetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok.');
            return await response.json();
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }
}

class Cache {
    constructor() {
        this.cache = new Map();
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        this.cache.set(key, value);
    }

    has(key) {
        return this.cache.has(key);
    }
}

const handler = {
    get(target, property) {
        if (!target.has(property)) {
            print(`Fetching data for: ${property}`);
            let fetcher = new Fetcher(`https: 
            fetcher.fetchData().then(data => target.set(property, data));
        } else {
            print(`Cache hit for: ${property}`);
        }
        return target.get(property);
    }
};

const cachedData = new Proxy(new Cache(), handler);

async function run() {
    print('Data:', await cachedData['users']);
    print('Data:', await cachedData['posts']);
    print('Data:', await cachedData['users']);  
}

run();
