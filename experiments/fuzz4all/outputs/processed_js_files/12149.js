 
const handler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
class AdvancedFeatures {
    #privateField = 'secret';

    constructor(data) {
        this.data = data;
        this.calculate = this.calculate.bind(this);
    }

    get privateData() {
        return this.#privateField;
    }

    calculate(x) {
        this.result = this.data.reduce((acc, val) => acc + val * x, 0);
        return this;
    }

    logResult() {
        print(`Result: ${this.result}`);
        return this;
    }
}

 
const { a, ...rest } = { ...proxy };
print(`Destructured a: ${a}, rest: ${JSON.stringify(rest)}`);

 
async function asyncExample() {
    const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5]);
    const data = [...uniqueNumbers];

    const asyncFunc = new Promise((resolve) =>
        setTimeout(() => resolve('Async Operation Complete'), 1000)
    );

    print('Before await');
    const message = await asyncFunc;
    print(message);

    const af = new AdvancedFeatures(data);
    af.calculate(2).logResult();
}

asyncExample();
