 

class AdvancedExample {
    constructor() {
        this.dataStore = new Map();
        this.proxiedSet = new Set();
        
         
        this.proxy = new Proxy(this.proxiedSet, {
            get: (target, property) => {
                if (property === 'add') {
                    return (value) => {
                        print(`Adding ${value} to the set`);
                        return target.add(value);
                    };
                }
                return target[property];
            }
        });
    }
    
    async fetchData(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();
            this.dataStore.set(url, data);
            this.proxy.add(url);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async processData(url) {
        let data = this.dataStore.get(url);
        if (!data) {
            data = await this.fetchData(url);
        }
        return this.transformData(data);
    }

    transformData(data) {
         
        return data.map(item => ({
            ...item,
            processed: true,
            timestamp: new Date().toISOString()
        }));
    }
}

(async () => {
    const example = new AdvancedExample();
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
    const transformedData = await example.processData(url);
    print('Transformed Data:', transformedData);

     
    print('URLs fetched:', Array.from(example.proxiedSet));
})();
