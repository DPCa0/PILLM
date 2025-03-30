 

 
async function* fetchData(urls) {
    for (const url of urls) {
         
        await new Promise(res => setTimeout(res, 1000));
        yield `Data from ${url}`;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop);
        } else {
            print(`Property ${prop} does not exist on target`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to value: ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
class DataManager {
    #data = {};  

    static instanceCount = 0;  

    constructor() {
        DataManager.instanceCount++;
        this.proxyData = new Proxy(this.#data, handler);
    }

    async loadData(urls) {
        for await (const data of fetchData(urls)) {
            const key = `data${Object.keys(this.proxyData).length + 1}`;
            this.proxyData[key] = data;
        }
    }

    get data() {
        return this.proxyData;
    }
}

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
    const dataManager = new DataManager();

    await dataManager.loadData(urls);

    print(dataManager.data.data1);  
    print(`Number of DataManager instances: ${DataManager.instanceCount}`);
})();
