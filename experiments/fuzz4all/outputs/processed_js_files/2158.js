 
(async () => {
     
    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: 'Advanced JS', version: 'ES2023' };
            Math.random() > 0.1 ? resolve(data) : reject(new Error('Fetch failed'));
        }, 1000);
    });

     
    try {
        const { name, version } = await fetchData();
        const info = { ...{ name, version }, released: true };
        print(`Library: ${info.name}, Version: ${info.version}, Released: ${info.released}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

     
    const target = { framework: 'Angular', language: 'TypeScript' };
    const handler = {
        get: (obj, prop) => prop in obj ? obj[prop] : `Property '${prop}' does not exist`,
    };
    const proxy = new Proxy(target, handler);
    
    print(proxy.framework);  
    print(proxy.library);   

     
    const uniqueKey = Symbol('unique');
    const obj = { [uniqueKey]: 'Secret Value' };
    print(obj[uniqueKey]);  

     
    function* generator() {
        yield* [1, 2, 3];
    }
    
    for (const value of generator()) {
        print(value);  
    }
})();
