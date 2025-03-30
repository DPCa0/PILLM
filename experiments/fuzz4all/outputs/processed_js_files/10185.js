 

 
const _internal = Symbol('internal');

 
class ComplexObject {
    constructor() {
        this[_internal] = { values: [] };
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return `Property ${prop.toString()} doesn't exist`;
            },
            set(target, prop, value) {
                if (prop === _internal) {
                    throw new Error("Cannot modify internal property directly");
                }
                return Reflect.set(target, prop, value);
            }
        });
    }

     
    *valueGenerator() {
        for (const value of this[_internal].values) {
            yield value;
        }
    }

    addValue(value) {
        this[_internal].values.push(value);
    }

    [Symbol.iterator]() {
        return this.valueGenerator();
    }
}

 
async function asyncProcess(values) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (const value of values) {
        await delay(100);   
        print(`Processed value: ${value}`);
    }
}

 
const obj = new ComplexObject();
obj.addValue(1);
obj.addValue(2);
obj.addValue(3);

(async () => {
    await asyncProcess(obj);
})();
