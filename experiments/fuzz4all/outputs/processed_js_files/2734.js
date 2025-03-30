 
const EventEmitter = require('events');

 
class AdvancedEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.data = new Map();
    }

     
    setData(key, value) {
        this.data.set(key, new Proxy(value, {
            get(target, prop) {
                print(`Property '${prop}' accessed with value:`, target[prop]);
                return target[prop];
            },
            set(target, prop, newValue) {
                print(`Property '${prop}' set from ${target[prop]} to ${newValue}`);
                target[prop] = newValue;
                return true;
            }
        }));
        this.emit('dataChanged', { key, value });
    }
}

 
const advancedEmitter = new AdvancedEventEmitter();

 
advancedEmitter.on('dataChanged', (data) => {
    print(`Data for '${data.key}' has been set.`);
});

 
async function asyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Async operation completed.');
        }, 1000);
    });
}

(async () => {
     
    const result = await asyncOperation();
    print(result);

     
    const ws = new WeakSet();
    let obj = { foo: 'bar' };
    ws.add(obj);
    print('Object added to WeakSet:', ws.has(obj));

     
    obj = null;  

     
    advancedEmitter.setData('user', { name: 'Alice', age: 30 });

     
    const user = advancedEmitter.data.get('user');
    print('Name:', user.name);
    user.age = 31;
})();
