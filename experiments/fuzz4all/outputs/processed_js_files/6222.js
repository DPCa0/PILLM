 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const person = new Proxy({ name: 'Alice', age: 25 }, handler);

 
async function* asyncNumberGenerator(limit) {
    let num = 0;
    while (num < limit) {
        yield new Promise(resolve => setTimeout(() => resolve(num++), 100));
    }
}

(async () => {
     
    print(person.name);  
    person.age = 26;  
    print(person.age);  

     
    for await (const num of asyncNumberGenerator(5)) {
        print(`Generated number: ${num}`);
    }

     
    const entries = [['a', 1], ['b', 2], ['c', 3]];
    const myMap = new Map(entries);

    for (const [key, value] of myMap) {
        print(`Key: ${key}, Value: ${value}`);
    }

     
    const privateField = Symbol('private');
    const obj = {
        [privateField]: 'hidden value',
        show() {
            print(this[privateField]);
        }
    };

    obj.show();  

     
    const promise1 = Promise.resolve('First resolved');
    const promise2 = Promise.reject('Second rejected');
    const promise3 = Promise.resolve('Third resolved');

    const results = await Promise.allSettled([promise1, promise2, promise3]);
    results.forEach((result, index) => {
        print(`Promise ${index + 1}:`, result.status === 'fulfilled' ? result.value : result.reason);
    });
})();
