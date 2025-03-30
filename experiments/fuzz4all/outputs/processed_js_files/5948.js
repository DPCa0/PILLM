 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property '${prop}' with value: ${target[prop]}`);
            return Reflect.get(target, prop);
        }
        return 'Property does not exist';
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to value: ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const targetObj = { a: 1, b: 2, c: 3 };

 
const proxyObj = new Proxy(targetObj, handler);

 
async function manipulateProxy() {
     
    const { a, b, c } = proxyObj;
    print(`Destructured values: a=${a}, b=${b}, c=${c}`);

     
    await new Promise(resolve => setTimeout(resolve, 1000));

     
    proxyObj.a = 10;
    proxyObj.d = 20;

     
    const uniqueKey = Symbol('unique');
    proxyObj[uniqueKey] = 'Symbol Property';
    print(`Unique key value: ${proxyObj[uniqueKey]}`);
}

 
manipulateProxy().then(() => print('Proxy manipulation complete'));
