class ComplexFeatureDemo {
    constructor() {
        this.value = 0;
    }

     
    createProxy() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                print(`Accessed property: ${String(prop)}`);
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                print(`Setting property: ${String(prop)} to ${value}`);
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

     
    static *range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

     
    async simulateAsyncOperation() {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        print("Starting async operation...");
        await delay(1000);  
        print("Async operation completed.");
    }
}

 
const dataMap = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

print('Iterating over a Map:');
for (let [key, value] of dataMap) {
    print(`${key}: ${value}`);
}

 
const [firstKey, firstValue] = dataMap.entries().next().value;
print(`First entry in Map: ${firstKey}: ${firstValue}`);

 
const demoInstance = new ComplexFeatureDemo();
const proxy = demoInstance.createProxy();
proxy.value = 42;
print(`Current value: ${proxy.value}`);

 
print('Range from 5 to 10:');
for (let num of ComplexFeatureDemo.range(5, 10)) {
    print(num);
}

 
demoInstance.simulateAsyncOperation();
