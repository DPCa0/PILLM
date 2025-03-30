 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const originalObject = { a: 1, b: 2 };
const proxy = new Proxy(originalObject, handler);

 
async function* asyncGen(limit) {
    for (let i = 0; i < limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

 
async function processAsyncGen() {
    for await (let num of asyncGen(3)) {
        proxy[num] = `Number ${num}`;
        print(proxy[num]);
    }
}

 
Promise.allSettled([
    Promise.resolve(3),
    Promise.reject(new Error('Failure')),
    new Promise(resolve => setTimeout(() => resolve(7), 500))
]).then(results => {
    results.forEach(result => print(result.status, result.value || result.reason));
});

 
const user = { name: 'John', address: { city: 'Unknown' } };
const city = user?.address?.city ?? 'City not available';
print(city);

 
processAsyncGen();
