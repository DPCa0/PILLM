 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            let response = await fetch(`${this.apiUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

function createHandler(target) {
    return {
        get: (obj, prop) => prop in obj ? obj[prop] : 'Property not found',
        set: (obj, prop, value) => {
            if (prop.startsWith('_')) {
                console.warn(`Attempt to modify read-only property ${prop}`);
                return false;
            }
            obj[prop] = value;
            return true;
        }
    };
}

const apiProxy = new Proxy(new DataFetcher('https://api.example.com'), createHandler(DataFetcher.prototype));

(async () => {
    let result = await apiProxy.fetchData('data');
    print(result);

    print(apiProxy.nonExistentProp);  

    apiProxy._privateProp = 'Try to change';  

    apiProxy.newProp = 'New value';
    print(apiProxy.newProp);  
})();
