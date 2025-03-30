 

class DataStore {
    constructor() {
        this.data = {};
    }

    async getData(key) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.data[key];
    }

    async setData(key, value) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.data[key] = value;
    }
}

 
const handler = {
    get: async function(target, property, receiver) {
         
        return Reflect.get(target, property, receiver);
    },
    set: function(target, property, value, receiver) {
        print(`Setting value of ${property} to ${value}`);
         
        return Reflect.set(target, property, value, receiver);
    }
};

 
const proxiedDataStore = new Proxy(new DataStore(), handler);

(async function() {
     
    await proxiedDataStore.setData('foo', 42);
    const value = await proxiedDataStore.getData('foo');
    
    print(`Value of 'foo': ${value}`);
})();
