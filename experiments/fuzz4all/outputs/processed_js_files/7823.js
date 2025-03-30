 

const asyncOperation = async (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data > 0) resolve(`Success: ${data}`);
            else reject(new Error("Failure: Negative data"));
        }, 1000);
    });
};

const executeAsyncOps = async () => {
    try {
        const result = await asyncOperation(1);
        print(result);
    } catch (error) {
        console.error(error.message);
    }

    try {
        const result = await asyncOperation(-1);
        print(result);
    } catch (error) {
        console.error(error.message);
    }
};

const handler = {
    get(target, property, receiver) {
        if (property in target) {
            print(`Property accessed: ${property}`);
            return Reflect.get(target, property, receiver);
        } else {
            throw new ReferenceError(`Property '${property}' does not exist.`);
        }
    },
    set(target, property, value, receiver) {
        print(`Setting property '${property}' to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

const data = { value: 42 };
const proxyData = new Proxy(data, handler);

print(proxyData.value);  
proxyData.value = 100;         
print(proxyData.value);  

executeAsyncOps();
