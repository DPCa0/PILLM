 

 
async function* fetchData() {
    const data = [1, 2, 3, 4, 5];
    for (const item of data) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
const targetObject = {};
const handler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(targetObject, handler);

 
async function processData() {
    const dataGenerator = fetchData();
    for await (const value of dataGenerator) {
        print(`Fetched value: ${value}`);
         
        proxy[`value_${value}`] = value * 2; 
        print(`Transformed value stored in proxy: ${proxy[`value_${value}`]}`);
    }
}

 
processData().then(() => print('Data processing complete.'));
