 
async function* asyncNumberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const proxyArray = new Proxy([], handler);

 
(async () => {
    const gen = asyncNumberGenerator(5);

    for await (let num of gen) {
        proxyArray.push(num);
    }

    const promises = proxyArray.map(async (num) => {
        if (num % 2 === 0) {
            return Promise.resolve(`${num} is even`);
        } else {
            return Promise.reject(`${num} is odd`);
        }
    });

    const results = await Promise.allSettled(promises);

    results.forEach(({ status, value, reason }) => {
        if (status === "fulfilled") {
            print("Success:", value);
        } else {
            print("Error:", reason);
        }
    });

     
    function dynamicFunctionCall(funcName) {
        const functions = {
            greet: (name) => `Hello, ${name}!`,
            farewell: (name) => `Goodbye, ${name}!`
        };
        return Reflect.apply(functions[funcName], null, ["World"]);
    }

    print(dynamicFunctionCall('greet'));
    print(dynamicFunctionCall('farewell'));
})();
