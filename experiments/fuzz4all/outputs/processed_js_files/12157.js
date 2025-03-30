 

const handler = {
    get: function(target, prop, receiver) {
        if (prop === Symbol.iterator) {
            return function*() {
                for (let i = 0; i < target.length; i++) {
                    yield target[i];
                }
            };
        }
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        if (prop === 'push' || prop === 'unshift') {
            value = value.map(item => item * 2);  
        }
        return Reflect.set(...arguments);
    }
};

let array = new Proxy([], handler);

async function* asyncGenerator() {
    array.push(1, 2, 3);
    for (const item of array) {
        yield await Promise.resolve(item);
    }
}

(async () => {
    for await (const num of asyncGenerator()) {
        print(num);  
    }
})();
