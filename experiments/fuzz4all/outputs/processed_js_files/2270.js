class ComplexSystem {
    constructor(name) {
        this.name = name;
        this.cache = new Map();
    }
    
    async fetchData(url) {
        if (this.cache.has(url)) {
            return Promise.resolve(this.cache.get(url));
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.cache.set(url, data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    static processItems(items) {
        return items.map(item => ({
            ...item,
            processed: true,
            timestamp: new Date().toISOString()
        }));
    }

    logData(url) {
        this.fetchData(url).then(data => {
            const processedData = ComplexSystem.processItems(data);
            console.table(processedData);
        }).catch(error => console.error('Log Data Error:', error));
    }
}

 
const validationHandler = {
    set(target, property, value) {
        if (property === 'name' && typeof value !== 'string') {
            throw new TypeError('Name must be a string');
        }
        target[property] = value;
        return true;
    }
};

 
const system = new Proxy(new ComplexSystem('Advanced System'), validationHandler);
system.logData('https://jsonplaceholder.typicode.com/posts');
