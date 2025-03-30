 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
};

let targetObj = { x: 10, y: 20 };
const proxy = new Proxy(targetObj, handler);

 
function* numberGenerator(start) {
    let i = start;
    while (true) {
        yield i++;
    }
}

const gen = numberGenerator(1);

 
(async () => {
    proxy.x = 100;
    print(proxy.x);

     
    const imports = ['module1', 'module2'].map(module => import(`./${module}.js`));

    try {
        const [module1, module2] = await Promise.all(imports);
        print(module1, module2);
    } catch (error) {
        console.error('Error loading modules:', error);
    }

     
    print('Generated number:', gen.next().value);
    print('Generated number:', gen.next().value);
})();
