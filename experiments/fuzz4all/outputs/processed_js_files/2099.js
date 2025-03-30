 
async function* dataStreamSimulator(max) {
    for (let i = 0; i < max; i++) {
         
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        yield { timestamp: Date.now(), value: Math.random() * 100 };
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

const monitoredObject = new Proxy({}, handler);

 
function readonly(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

class Settings {
    @readonly
    static maxItems = 50;

    static getSettings() {
        return `Max items: ${this.maxItems}`;
    }
}

 
(async () => {
    const stream = dataStreamSimulator(5);

     
    const values = await Promise.all([
        (async () => {
            for await (const data of stream) {
                print('Stream Data:', data);
            }
        })(),
        new Promise(resolve => setTimeout(resolve, 5000, 'Data processing complete'))
    ]);

    print(values);

     
    monitoredObject.name = 'Data Monitor';
    print(monitoredObject.name);

     
    print(Settings.getSettings());

     
     
})();
