 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Getting property '${prop}': ${obj[prop]}`);
            return obj[prop];
        } else {
            console.warn(`Property '${prop}' not found!`);
        }
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

 
const privateData = new WeakMap();

class ComplexFeature {
    constructor(name, value) {
         
        privateData.set(this, { name, value });
        
         
        return new Proxy(this, handler);
    }
    
     
    static async computeData() {
        const data = await Promise.resolve([10, 20, 30, 40]);
        return data.map(x => x * 2);
    }
    
     
    [Symbol.iterator]() {
        let index = 0;
        const data = privateData.get(this).value;
        
        return {
            next: () => ({
                value: data[index++],
                done: index > data.length
            })
        };
    }
}

 
const obj = new ComplexFeature('MyFeature', [1, 2, 3]);

 
print(`Feature Name: ${obj.name}`);
obj.name = 'UpdatedFeature';

 
ComplexFeature.computeData().then(result => {
    print('Computed Data:', result);
});

 
for (const value of obj) {
    print('Iterated value:', value);
}
