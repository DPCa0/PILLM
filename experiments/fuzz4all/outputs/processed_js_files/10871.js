 

class DataHandler {
    constructor(data) {
        this.data = data;
    }

    async fetchData(key) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data[key]);
            }, 1000);
        });
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return Reflect.get(target, prop, receiver);
        }
        console.warn(`Property '${prop}' does not exist`);
        return undefined;
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

const initialData = { foo: "bar", baz: 42 };
const proxiedData = new Proxy(new DataHandler(initialData), handler);

 
async function handleDataOperations() {
     
    const fooData = await proxiedData.fetchData('foo');
    print(`Fetched data: ${fooData}`);

     
    print(`Accessing 'baz': ${proxiedData.data.baz}`);

     
    proxiedData.data.newProp = "newValue";

     
    print(`Accessing 'nonExistent': ${proxiedData.data.nonExistent}`);
}

handleDataOperations();
