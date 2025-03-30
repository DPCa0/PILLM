class ComplexFeature {
    constructor() {
        this._data = new WeakMap();
    }

    addData(key, value) {
        let dataMap = this._data.get(this) || new Map();
        dataMap.set(key, value);
        this._data.set(this, dataMap);
    }

    getData(key) {
        let dataMap = this._data.get(this);
        return dataMap ? dataMap.get(key) : undefined;
    }
}

async function fetchDataAndLog(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const feature = new ComplexFeature();
        
        for (const [key, value] of Object.entries(data)) {
            feature.addData(key, value);
        }
        
        print('Fetched Data:', data);

        for (const key of Object.keys(data)) {
            print(`Data for ${key}:`, feature.getData(key));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const simulateAsyncOperation = async (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
};

(async function() {
    await simulateAsyncOperation(1000);
    print('Simulating async operation completed.');
    await fetchDataAndLog('https://jsonplaceholder.typicode.com/todos/1');
})();
