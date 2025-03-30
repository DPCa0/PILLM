 

(async () => {
     
    const { v4: uuidv4 } = await import('https://cdn.jsdelivr.net/gh/uuidjs/uuid@latest/dist/esm-browser/index.js');

     
    const target = {
        name: 'Advanced JavaScript',
        likes: 0
    };

    const handler = {
        set: (obj, prop, value) => {
            print(`Property ${prop} set to ${value}`);
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(target, handler);

     
    const proxyMap = new Map();
    const id = uuidv4();
    proxyMap.set(id, proxy);

     
    function* propertyGenerator(obj) {
        for (let key of Object.keys(obj)) {
            yield key;
        }
    }

     
    const gen = propertyGenerator(proxy);
    print('Properties of proxy:');
    for (let property of gen) {
        print(property);
    }

     
    proxy.name = 'Advanced JavaScript with UUID';
    proxy.likes += 1;

     
    const retrievedProxy = proxyMap.get(id);
    print(`Retrieved proxy name: ${retrievedProxy.name}`);
    print(`Retrieved proxy likes: ${retrievedProxy.likes}`);
})();
