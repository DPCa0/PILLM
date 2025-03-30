 
(async () => {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    async function* asyncGenerator() {
        for (let i = 0; i < 3; i++) {
            await delay(1000);  
            yield `Value ${i}`;
        }
    }

     
    const handler = {
        get(target, prop, receiver) {
            if (prop in target) {
                print(`Property '${prop}' accessed`);
            }
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value) {
            print(`Setting value '${value}' to property '${prop}'`);
            return Reflect.set(target, prop, value);
        }
    };

     
    const data = new Proxy({ name: 'Proxy Object' }, handler);

     
    async function processData() {
        const gen = asyncGenerator();
        for await (const value of gen) {
            print(value);
        }
    }

     
    data.name;  
    data.name = 'New Name';  

     
    await processData();
})();
