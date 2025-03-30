 
async function* fetchData() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    for (const url of urls) {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(`Data from ${url}`), Math.random() * 1000);
        });
    }
}

 
const targetObject = { prop1: 'value1', prop2: 'value2' };
const handler = {
    get: (target, prop, receiver) => {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};
const proxyObject = new Proxy(targetObject, handler);

 
function styled(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}%c${curr}${values[i] || ''}`, '');
}
print(styled`Fetching: ${proxyObject.prop1} and ${proxyObject.prop2}`, 'color: blue; font-weight: bold;');

 
(async () => {
    class DataManager {
        #data;
        
        constructor() {
            this.#data = [];
        }

        async addData(generator) {
            for await (const value of generator) {
                this.#data.push(value);
                print(`Added: ${value}`);
            }
        }

        getData() {
            return this.#data;
        }
    }

    const manager = new DataManager();
    await manager.addData(fetchData());
    print('All data:', manager.getData());
})();
