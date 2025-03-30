Certainly! Here is a complex JavaScript program that leverages advanced features:

 
const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} doesn't exist!`
};

const target = {
    [Symbol('id')]: 123,
    name: 'Advanced JS'
};

const proxy = new Proxy(target, handler);

const makeGenerator = function* () {
    yield* [1, 2, 3, 4, 5];
};

async function processData() {
    const data = [10, 20, 30];
    
    for await (let num of data.map(async (item) => {
        const delay = Math.floor(Math.random() * 1000);
        return new Promise(resolve => setTimeout(() => resolve(item * 2), delay));
    })) {
        print('Processed:', num);
    }
}

class AdvancedCollection {
    constructor(...elements) {
        this.elements = [...elements];
    }
    
    async *[Symbol.asyncIterator]() {
        for (const element of this.elements) {
            yield new Promise(resolve => setTimeout(() => resolve(element), Math.random() * 1000));
        }
    }
}

print(proxy.name); // Access existing property
print(proxy.nonExistentProperty); // Try accessing non-existing property

for (const num of makeGenerator()) {
    print('Generated number:', num);
}

processData().then(() => print('All data processed.'));

const collection = new AdvancedCollection('a', 'b', 'c');

(async () => {
    for await (const item of collection) {
        print('Async iterated item:', item);
    }
})();

This program demonstrates the use of a Proxy for property access control, Symbols for unique property keys, a generator for iterable sequences, and asynchronous operations with `async/await` and `Promise`. It also includes the use of an `async` iterator for handling asynchronous collections.