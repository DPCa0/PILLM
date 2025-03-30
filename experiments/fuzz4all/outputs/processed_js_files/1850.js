 
const handler = {
    get(target, prop) {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

const target = { message: 'Hello, Proxy!' };
const proxy = new Proxy(target, handler);

 
async function* fetchData() {
    const data = ['Data1', 'Data2', 'Data3'];
    for (const item of data) {
        yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
    }
}

 
(async () => {
    proxy.message = 'Hello, World!';
    print(proxy.message);

    print('Fetching data using async generator:');
    for await (const item of fetchData()) {
        print(item);
    }

     
    const weakMap = new WeakMap();
    let obj = {};
    weakMap.set(obj, 'Some value');
    print('WeakMap value:', weakMap.get(obj));

    obj = null;   

     
    const name = 'JavaScript';
    print(`This code showcases advanced ${name} features!`);
})();
