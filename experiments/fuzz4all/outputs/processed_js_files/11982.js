 

 
const app = (function() {
     
    const privateDataKey = Symbol('privateData');

     
    const privateDataStore = new WeakMap();

     
    function createValidatedObject(data) {
        return new Proxy(data, {
            set(target, property, value) {
                if (typeof value === 'number' && value >= 0) {
                    print(`Setting ${property} to ${value}`);
                    target[property] = value;
                    return true;
                } else {
                    throw new TypeError('Value must be a non-negative number');
                }
            }
        });
    }

     
    function logAccess(target, name, descriptor) {
        const original = descriptor.get;
        descriptor.get = function() {
            print(`Accessed: ${name}`);
            return original.call(this);
        };
        return descriptor;
    }

    class ComplexObject {
        constructor(name, value) {
            this.name = name;
            privateDataStore.set(this, createValidatedObject({ [privateDataKey]: value }));
        }

        @logAccess
        get value() {
            return privateDataStore.get(this)[privateDataKey];
        }

        set value(newValue) {
            const data = privateDataStore.get(this);
            data[privateDataKey] = newValue;
        }
    }

     
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

     
    function* numberGenerator(limit) {
        for (let i = 0; i < limit; i++) {
            yield i;
        }
    }

     
    return {
        createComplexObject: (name, value) => new ComplexObject(name, value),
        fetchData,
        numberGenerator
    };
})();

 
const complex = app.createComplexObject('TestObject', 10);
print(complex.value);  