 
class ComplexObject {
    constructor() {
        this._data = new Map();
    }

    set(key, value) {
         
        this._data.set(key, typeof value === 'function' ? `fn-${value()}` : value);
    }

    get(key) {
        return this._data.get(key);
    }

    get size() {
        return this._data.size;
    }

     
    *entries() {
        for (let [key, value] of this._data.entries()) {
            yield { key, value };
        }
    }

     
    [Symbol.iterator]() {
        return this.entries();
    }

    static async fetchAndSet(instance, url) {
         
        try {
            const response = await fetch(url);
            const data = await response.json();
            Object.entries(data).forEach(([key, value]) => instance.set(key, value));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return (...args) => {
                print(`Method ${prop} called with arguments: ${args}`);
                return Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const complexInstance = new Proxy(new ComplexObject(), handler);

complexInstance.set('name', 'JavaScript');
complexInstance.set('version', 'ES2023');
complexInstance.set('description', () => 'Advanced Features');

print(`ComplexObject Size: ${complexInstance.size}`);

 
(async () => {
    await ComplexObject.fetchAndSet(complexInstance, 'https://api.github.com/repos/javascript');
    for (const entry of complexInstance) {
        print(entry);
    }
})();
