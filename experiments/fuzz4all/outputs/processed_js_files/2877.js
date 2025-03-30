 
class ComplexModule {
    constructor() {
        this.data = [1, 2, 3, 4, 5];
    }

     
    async fetchData(index) {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
        return this.data[index];
    }

     
    async *dataGenerator() {
        for (let i = 0; i < this.data.length; i++) {
            yield await this.fetchData(i);
        }
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Method "${prop}" called with args: ${args}`);
                return target[prop].apply(this, args);
            }
        }
        print(`Property "${prop}" accessed`);
        return Reflect.get(target, prop, receiver);
    }
}

 
const moduleInstance = new Proxy(new ComplexModule(), handler);

(async () => {
    const generator = moduleInstance.dataGenerator();
    for await (const value of generator) {
        print('Value:', value);
    }
})();
