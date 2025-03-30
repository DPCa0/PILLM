 
const complexModule = (function () {
    const privateData = "Secret";

    const publicApi = {
        getPrivateData: function() {
            return privateData;
        },
        processArray: function(arr) {
            return arr.flatMap(n => n > 0 ? [n, -n] : []);
        },
        asyncGenerator: async function* (arr) {
            for (let item of arr) {
                yield await Promise.resolve(item * 2);
            }
        }
    };

    return publicApi;
})();

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    }
};

const user = {
    name: "Alice",
    age: 30
};

const proxiedUser = new Proxy(user, handler);

print(proxiedUser.name);   
print(proxiedUser.height);  

 
print(complexModule.getPrivateData());  
print(complexModule.processArray([1, -2, 3]));  

 
(async () => {
    const nums = [1, 2, 3];
    const asyncGen = complexModule.asyncGenerator(nums);

    for await (const val of asyncGen) {
        print(val);  
    }
})();
