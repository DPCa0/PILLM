 
function timeDecorator(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        print(`${key} executed in ${end - start}ms`);
        return result;
    };
    return descriptor;
}

 
class ComplexFeatures {

    constructor() {
        this.data = new Map();
    }

     
    addData(key, value) {
        this.data.set(key, { value, timestamp: new Date() });
    }

     
    @timeDecorator
    async *asyncGenerator(count) {
        for (let i = 0; i < count; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield `Data-${i}`;
        }
    }

     
    createLoggingProxy(obj) {
        return new Proxy(obj, {
            get(target, property) {
                print(`Getting ${String(property)}`);
                return target[property];
            },
            set(target, property, value) {
                print(`Setting ${String(property)} to ${value}`);
                target[property] = value;
                return true;
            }
        });
    }
}

 
const complex = new ComplexFeatures();

 
const proxiedData = complex.createLoggingProxy({ name: 'ProxyExample' });
proxiedData.name = 'NewName';
print(proxiedData.name);

 
(async () => {
    const asyncGen = complex.asyncGenerator(3);
    for await (const item of asyncGen) {
        print(item);
    }
})();

 
complex.addData('key1', 42);
print(complex.data);
