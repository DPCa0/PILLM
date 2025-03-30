 
async function* complexExample(iterable) {
    for await (const { value: { data } } of iterable) {
        yield data.split('').reverse().join('');
    }
}

 
async function* mockAsyncIterable() {
    const responses = [
        { value: { data: 'JavaScript' } },
        { value: { data: 'AsyncAwait' } },
        { value: { data: 'Generators' } }
    ];
    for (const response of responses) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield response;
    }
}

 
(async () => {
    try {
        for await (const result of complexExample(mockAsyncIterable())) {
            print(result);  
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();

 
const targetObject = { a: 1, b: 2 };
const handler = {
    get(target, prop, receiver) {
        print(`Property accessed: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting value ${value} to property: ${prop}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy(targetObject, handler);
proxy.a;  
proxy.c = 3;  
print(proxy.c);  
