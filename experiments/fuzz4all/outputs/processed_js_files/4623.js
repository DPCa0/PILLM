 

class Reactive {
    constructor(target) {
        this.target = target;
        return this._createProxy(target);
    }

    _createProxy(obj) {
        return new Proxy(obj, {
            get: (target, prop, receiver) => {
                if (typeof target[prop] === 'object' && target[prop] !== null) {
                    return this._createProxy(target[prop]);
                }
                return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value) => {
                const result = Reflect.set(target, prop, value);
                print(`Property ${String(prop)} set to ${value}`);
                return result;
            }
        });
    }
}

function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First Promise Resolved!'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second Promise Resolved!'), 1000));
}

async function handleGenerator(gen) {
    for await (const value of gen) {
        print(value);
    }
}

const data = new Reactive({
    user: { name: 'Alice', age: 25 },
    settings: { theme: 'dark', notifications: true }
});

data.user.name = 'Bob';
data.settings.theme = 'light';

handleGenerator(asyncGenerator());
