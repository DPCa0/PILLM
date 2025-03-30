 

const handler = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function' && prop in target) {
            return function (...args) {
                print(`Method ${prop} called with arguments: ${args}`);
                return target[prop].apply(this, args);
            };
        }
        print(`Property ${prop.toString()} accessed, value: ${target[prop]}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Property ${prop.toString()} set to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const asyncFunction = async () => {
    const data = new Proxy({
        value: 0,
        increment() {
            this.value++;
        }
    }, handler);

    const symbol = Symbol("increment");
    data[symbol] = function () {
        this.value += 2;
    };

    function* generator() {
        while (true) {
            yield new Promise(resolve => setTimeout(() => {
                data.increment();
                resolve(`Value after increment: ${data.value}`);
            }, 1000));
        }
    }

    const gen = generator();
    for (let i = 0; i < 5; i++) {
        print(await gen.next().value);
        if (i === 2) {
            data[symbol]();
            print(`Special increment applied, current value: ${data.value}`);
        }
    }
};

asyncFunction().catch(console.error);
