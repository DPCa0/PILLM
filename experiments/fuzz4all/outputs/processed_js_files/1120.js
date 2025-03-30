 

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
const asyncOperation = (result) => new Promise((resolve) => {
    setTimeout(() => resolve(result), 1000);
});

 
function* generatorFunc() {
    try {
        proxy.a = yield asyncOperation(10);
        proxy.b = yield asyncOperation(20);
        return proxy.a + proxy.b;
    } catch (error) {
        console.error("Error in generator:", error);
    }
}

 
function run(generator) {
    const iterator = generator();

    function process(iteratorResult) {
        if (iteratorResult.done) return Promise.resolve(iteratorResult.value);

        return Promise.resolve(iteratorResult.value).then((result) =>
            process(iterator.next(result))
        );
    }

    return process(iterator.next());
}

 
run(generatorFunc).then((result) => print("Final Result:", result));
