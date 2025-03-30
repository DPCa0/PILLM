 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Some valuable data" });
        }, 1000);
    });
};

 
async function* fetchInChunks() {
    for (let i = 0; i < 3; i++) {
        const result = await fetchData();
        yield result.data + ` - chunk ${i + 1}`;
    }
}

 
const logHandler = {
    get: function (target, property, receiver) {
        print(`GET ${property}`);
        return Reflect.get(...arguments);
    }
};

 
const proxiedGenerator = new Proxy(fetchInChunks, logHandler);

(async () => {
    const iterator = proxiedGenerator();

    for await (let chunk of iterator) {
        print(chunk);
    }
})();

 
class AdvancedClass {
    #privateField = "This is private";

    constructor() {
        this.publicField = "This is public";
    }

    #privateMethod() {
        return "Accessed private method!";
    }

    publicMethod() {
        print(this.#privateMethod());
    }
}

 
const advancedInstance = new AdvancedClass();
print(advancedInstance.publicField);
advancedInstance.publicMethod();
