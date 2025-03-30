 

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
        return `Property ${prop} does not exist.`;
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = {
    message: "Hello, Proxy!"
};

const proxy = new Proxy(targetObject, handler);

 
async function* fetchData() {
    let data = [
        new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000)),
        new Promise(resolve => setTimeout(() => resolve('Data 2'), 2000)),
        new Promise(resolve => setTimeout(() => resolve('Data 3'), 1500))
    ];
    for (const promise of data) {
        yield await promise;
    }
}

 
(async () => {
    for await (const data of fetchData()) {
        print(data);
    }
})();

 
print(proxy.message);
proxy.message = "Hello, Advanced JavaScript!";
print(proxy.message);
print(proxy.nonExistentProperty);
