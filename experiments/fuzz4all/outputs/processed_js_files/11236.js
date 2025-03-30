(async () => {
     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

     
    const createObservableObject = (obj, callback) => {
        return new Proxy(obj, {
            get(target, prop) {
                if (prop in target) {
                    callback(`Accessed property "${prop}": ${target[prop]}`);
                    return target[prop];
                }
                return undefined;
            },
            set(target, prop, value) {
                callback(`Setting property "${prop}" to "${value}"`);
                target[prop] = value;
                return true;
            }
        });
    };

     
    const person = createObservableObject({ name: 'Alice', age: 25 }, console.log);

     
    async function* dataStream() {
        while (true) {
            yield { timestamp: Date.now(), value: Math.random() };
            await delay(1000 + Math.random() * 2000);
        }
    }

     
    const handler = {
        get: function(target, prop, receiver) {
            if (prop in target) {
                print(`Reflecting access to ${prop}`);
                return Reflect.get(...arguments);
            } else {
                print(`Property "${prop}" not found!`);
            }
        }
    };
    const proxyPerson = new Proxy(person, handler);

     
    print(proxyPerson.name);
    proxyPerson.age = 30;

     
    const items = new Set();
    const itemData = new WeakMap();

    class Item {
        constructor(name, data) {
            this.name = name;
            items.add(this);
            itemData.set(this, data);
        }

        getData() {
            return itemData.get(this);
        }
    }

    const item1 = new Item('Item1', { info: 'Data for Item1' });
    print(item1.getData());

     
    for await (const data of dataStream()) {
        print(`Received data: ${JSON.stringify(data)}`);
        if (Math.random() > 0.95) break;  
    }
})();
