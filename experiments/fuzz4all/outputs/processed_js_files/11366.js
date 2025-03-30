 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
class DataStream {
    constructor(data) {
        this.data = data;
    }

     
    *dataGenerator() {
        for (const item of this.data) {
            yield item;
        }
    }

     
    async processData() {
        const generator = this.dataGenerator();
        for (let item = generator.next(); !item.done; item = generator.next()) {
            await delay(500);
            print(`Processed: ${item.value}`);
        }
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const dataStream = new Proxy(new DataStream(['A', 'B', 'C', 'D']), handler);

 
(async () => {
    await dataStream.processData();
})();
