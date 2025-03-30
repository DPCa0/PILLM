 
const uniqueKey = Symbol('unique');
const advancedObject = {
    [uniqueKey]: 'Hidden value',
    name: 'Complex Object',
    greet() {
        print(`Hello from ${this.name}`);
    },
    calculate: function*(start, end) {
        for (let i = start; i <= end; i++) {
            yield i * i;
        }
    }
};

 
const handler = {
    get: (target, prop) => {
        if (prop === 'info') {
            return `This is a proxy around ${target.name}`;
        }
        return target[prop];
    },
    set: (target, prop, value) => {
        if (prop === 'name') {
            print(`Setting name to ${value}`);
        }
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(advancedObject, handler);

 
const { name, ...rest } = proxy;
print(name);  
print(proxy.info);  

 
const tag = (strings, ...values) => strings.reduce((acc, str, idx) => `${acc}${str}${values[idx] || ''}`, '');
print(tag`The object ${proxy.name} says: ${proxy.greet()}`);

 
const asyncFunction = async () => {
    proxy.name = 'New Name';
    const calculatePromise = new Promise((resolve) => {
        const squares = [...proxy.calculate(1, 5)];
        setTimeout(() => resolve(squares), 1000);
    });

    const squares = await calculatePromise;
    print(squares);  
};
asyncFunction();

 
const privateData = new WeakMap();
privateData.set(proxy, { secret: 'Top Secret' });

print(privateData.get(proxy).secret);  

 
print(Reflect.ownKeys(proxy));  
