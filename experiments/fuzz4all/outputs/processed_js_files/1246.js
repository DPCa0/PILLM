 
const _privateField = Symbol('privateField');
class AdvancedExample {
    constructor(value) {
        this[_privateField] = value;
    }

     
    get privateValue() {
        return this[_privateField];
    }

     
    static async processData(data) {
        const processed = await Promise.all(data.map(async item => {
            const result = await AdvancedExample.doubleAsync(item);
            return result;
        }));
        return processed;
    }

     
    *generatorMethod() {
        yield* [1, 2, 3];
        const { a, b } = { a: 4, b: 5 };
        yield a + b;
    }

     
    static async [_privateField](n) {
        return new Promise(resolve => setTimeout(() => resolve(n * 2), 1000));
    }

     
    static doubleAsync(n) {
        return this[_privateField](n);
    }
}

 
(async () => {
    const instance = new AdvancedExample('Hidden value');
    print('Private Value:', instance.privateValue);  

     
    const numbers = [1, 2, 3, 4, 5];
    const results = await AdvancedExample.processData(numbers);
    print('Processed Data:', results);

     
    const genInstance = instance.generatorMethod();
    for (let value of genInstance) {
        print('Generator Yield:', value);
    }
})();
