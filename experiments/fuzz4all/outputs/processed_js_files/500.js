 

class Complex {
    constructor(value) {
        this._value = value;
    }

    async double() {
         
        return new Promise((resolve) => {
            setTimeout(() => resolve(this._value * 2), 1000);
        });
    }
}

const handler = {
    get: (target, property, receiver) => {
        if (property === 'value') {
            print(`Accessing value: ${Reflect.get(target, '_value')}`);
            return Reflect.get(target, '_value');
        }
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        if (property === 'value') {
            print(`Setting value: ${value}`);
            return Reflect.set(target, '_value', value, receiver);
        }
        return Reflect.set(target, property, value, receiver);
    }
};

const complexObject = new Proxy(new Complex(10), handler);

(async function() {
    print(`Original value: ${complexObject.value}`);
    complexObject.value = await complexObject.double();
    print(`Doubled value: ${complexObject.value}`);
})();
