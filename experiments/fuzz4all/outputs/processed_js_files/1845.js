 
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const measureExecutionTime = (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        console.time(key);
        const result = await originalMethod.apply(this, args);
        console.timeEnd(key);
        return result;
    };
    return descriptor;
};

class ComplexOperations {
    constructor() {
        this.data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    }

     
    @measureExecutionTime
    async processData() {
        await wait(100);  
        return this.data.reduce((acc, val) => acc + val, 0);
    }
    
     
    get average() {
        return this.data.length ? (this.totalSum / this.data.length).toFixed(2) : 0;
    }

     
    get totalSum() {
        if (!this._totalSum) {
            this._totalSum = this.data.reduce((acc, val) => acc + val, 0);
        }
        return this._totalSum;
    }
}

(async () => {
    const operations = new ComplexOperations();
    print(`Data set size: ${operations.data.length}`);
    print(`Total sum: ${await operations.processData()}`);
    print(`Average: ${operations.average}`);
})();
