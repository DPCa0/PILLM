 
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

 
const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function simulateAsyncOperation(num) {
    return new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));
}

 
(async () => {
     
    person.name = 'Bob';
    print(person.name);

     
    const sequence = generateSequence(1, 5);
    for (const num of sequence) {
        const result = await simulateAsyncOperation(num);
        print(`Processed value: ${result}`);
    }

     
    const map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
    ]);

    const set = new Set([1, 2, 3, 4, 5]);

     
    map.set('key3', 'value3');
    print('Map has key2:', map.has('key2'));

     
    set.add(6);
    set.delete(3);
    print('Set size:', set.size);

     
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5, 6];
    print('Combined array:', arr2);
})();
