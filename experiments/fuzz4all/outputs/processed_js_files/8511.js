 
const asyncFunction = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Hello, Proxy World!'), 1000);
    });
};

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return Reflect.get(target, prop);
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        Reflect.set(target, prop, value);
        return true;
    }
};

const targetObject = {
    message: 'Hello, world!',
    number: 42
};

const proxy = new Proxy(targetObject, handler);

(async () => {
    print(proxy.message);
    print(proxy.number);
    print(proxy.nonExistentProp);

    proxy.newProp = 'I am new here';
    print(proxy.newProp);

    const asyncMessage = await asyncFunction();
    proxy.message = asyncMessage;

    print(proxy.message);
})();
