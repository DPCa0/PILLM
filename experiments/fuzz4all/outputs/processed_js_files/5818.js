 
const handler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        if (property in target) {
            return Reflect.get(target, property, receiver);
        } else {
            return 42;  
        }
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    },
    has(target, property) {
        print(`Checking existence of ${property}`);
        return Reflect.has(target, property);
    },
    deleteProperty(target, property) {
        print(`Deleting ${property}`);
        return Reflect.deleteProperty(target, property);
    }
};

 
const obj = new Proxy({}, handler);

 
async function* asyncGen() {
    let i = 0;
    while (i < 3) {
        yield await new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

async function processAsyncGenerator() {
    for await (let num of asyncGen()) {
        print(`Generated number: ${num}`);
        obj[`key${num}`] = num;
    }
    print('Done generating');
    print('Properties in proxy object:', Object.keys(obj));
}

 
function tag(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? values[i].toUpperCase() : '');
    }, '');
}

const name = 'world';
print(tag`Hello, ${name}!`);

 
processAsyncGenerator().then(() => {
     
    print(obj.key0);  
    print(obj.key5);  
    print('key2' in obj);  
    delete obj.key1;  
});
