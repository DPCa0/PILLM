 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
const cache = {};
const generatorHandler = {
    get: (target, prop, receiver) => {
        if (prop === 'next') {
            return function () {
                const result = Reflect.apply(target[prop], target, arguments);
                cache[result.value] = result.value;
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
const proxiedGenerator = new Proxy(numberGenerator(), generatorHandler);

 
async function asyncOperation(num) {
    return new Promise((resolve) => setTimeout(() => resolve(num * 2), 100));
}

 
const asyncHandler = {
    apply: async (target, thisArg, args) => {
        print(`Processing number: ${args[0]}`);
        return await Reflect.apply(target, thisArg, args);
    }
};

const proxiedAsyncOperation = new Proxy(asyncOperation, asyncHandler);

 
async function main() {
    const gen = proxiedGenerator;
    for (let i = 0; i < 5; i++) {
        const { value } = gen.next();
        print(`Generated number: ${value}`);
        const result = await proxiedAsyncOperation(value);
        print(`Processed result: ${result}`);
        print(`Cache so far:`, cache);
    }
}

main();
