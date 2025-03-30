 

class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return this.transformData(data);
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }

    transformData(data) {
        return data.map(item => ({
            id: item.id,
            uppercasedName: item.name.toUpperCase(),
            emailDomain: this.extractDomain(item.email)
        }));
    }

    extractDomain(email) {
        return email.split('@')[1];
    }

    async processData(callback) {
        const data = await this.fetchData();
        if (data) {
            const enrichedData = this.enrichData(data);
            callback(enrichedData);
        }
    }

    enrichData(data) {
        return data.map(item => ({
            ...item,
            timestamp: new Date().toISOString()
        }));
    }
}

 
const handler = {
    get(target, prop, receiver) {
        const origMethod = target[prop];
        return function (...args) {
            print(`Calling ${prop} with arguments: ${args}`);
            return Reflect.apply(origMethod, target, args);
        };
    }
};

const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const manager = new Proxy(new DataManager(apiUrl), handler);

manager.processData((processedData) => {
    print('Processed Data:', processedData);
});
