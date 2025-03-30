 

 
const uniqueKey = Symbol('unique');

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

     
    async *processData() {
        for (let item of this.data) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield item * 2;
        }
    }

     
    static validateData(data) {
        return new Proxy(data, {
            set(target, key, value) {
                if (typeof value !== 'number') {
                    throw new Error(`Value must be a number, got ${typeof value}`);
                }
                target[key] = value;
                return true;
            }
        });
    }
}

 
let data = [1, 2, 3, 4, 5];

 
let validatedData = DataProcessor.validateData(data);

try {
    validatedData[2] = 'invalid';  
} catch (e) {
    console.error(e.message);
}

const dataProcessor = new DataProcessor(validatedData);

 
(async () => {
    for await (let value of dataProcessor.processData()) {
        print(`Processed value: ${value}`);
    }
})();

 
DataProcessor.prototype[uniqueKey] = function () {
    print("Unique method accessed through Symbol.");
};

 
dataProcessor[uniqueKey]();
