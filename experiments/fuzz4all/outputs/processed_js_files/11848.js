 

class DataManager {
    constructor(data) {
        this.data = data;
    }

    async fetchData() {
         
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.data);
            }, 1000);
        });
    }

    processData() {
         
        return Reflect.ownKeys(this.data).reduce((result, key) => {
            if (Reflect.has(this.data, key)) {
                result[key] = Reflect.get(this.data, key).toUpperCase();
            }
            return result;
        }, {});
    }
}

const handler = {
    get(target, property) {
        if (property in target) {
            return Reflect.get(target, property);
        } else {
            console.warn(`Property "${property}" does not exist on target object.`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting value for "${property}" to "${value}"`);
        Reflect.set(target, property, value);
        return true;
    }
};

const proxy = new Proxy(new DataManager({ name: 'Alice', role: 'Developer' }), handler);

(async () => {
     
    const data = await proxy.fetchData();
    print('Fetched Data:', data);

    const processedData = proxy.processData();
    print('Processed Data:', processedData);

    proxy.department = 'Engineering';  
    print('Department:', proxy.department);  
})();
