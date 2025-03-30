 
const complexOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomValue = Math.random();
            randomValue > 0.5 ? resolve(randomValue) : reject(new Error("Random value was too low!"));
        }, 1000);
    });
};

 
const executeComplexOperation = async () => {
    try {
        const result = await complexOperation();
        print(`Success! The operation returned: ${result.toFixed(2)}`);
    } catch (error) {
        console.error(`Operation failed: ${error.message}`);
    }
};

 
const targetObject = { key1: 'value1', key2: 'value2' };
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return target[property];
    }
};

const proxiedObject = new Proxy(targetObject, handler);

 
(async () => {
     
    const { key1, ...rest } = proxiedObject;
    print(`Destructured key1: ${key1}`);
    print(`Remaining object:`, rest);

     
    await executeComplexOperation();

     
    const results = [1, 2, 3].map(num => `Result: ${num * num}`);
    print(`Mapped results:`, results);
})();
