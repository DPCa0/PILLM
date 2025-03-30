 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
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

const obj = new Proxy({ message: 'Hello, world!' }, handler);

 
function* delayedIterator(array, delayTime) {
    for (const item of array) {
        yield delay(delayTime).then(() => item);
    }
}

 
(async function displayMessages() {
    const array = ['Welcome', 'to', 'the', 'JavaScript', 'world'];
    const iterator = delayedIterator(array, 1000);

    for (const promise of iterator) {
        print(await promise);
    }

    print(obj.message);  
    obj.message = 'Goodbye, world!';  
    print(obj.message);
})();
