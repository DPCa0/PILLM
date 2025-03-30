 
(async function complexFeatures() {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    const UNIQUE_KEY = Symbol('unique');

     
    const targetObject = {
        name: 'JavaScript',
        [UNIQUE_KEY]: 'Symbolic Property'
    };

    const handler = {
        get: (target, prop) => {
            if (prop === 'name') {
                return `Intercepted access to: ${target[prop]}`;
            } else if (prop === UNIQUE_KEY) {
                return target[prop];
            }
        }
    };

    const proxyObject = new Proxy(targetObject, handler);

     
    const dataArray = ['Hello', 'Complex', 'World'];
    const [greeting, adjective, noun] = dataArray;

     
    async function processData() {
        print(`${greeting}, ${adjective} ${noun}!`);
        print(proxyObject.name);  
        await delay(1000);  

         
        print(`Unique property value: ${proxyObject[UNIQUE_KEY]}`);
    }

    await processData();
})();
