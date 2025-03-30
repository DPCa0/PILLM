 

 
function* dataGenerator() {
    yield Promise.resolve({ value: 10 });
    yield Promise.resolve({ value: 20 });
    yield Promise.resolve({ value: 30 });
}

 
async function processData(generator) {
    let data;
    while (!(data = generator.next()).done) {
        const resolvedData = await data.value;
        print(`Processing: ${resolvedData.value}`);
    }
}

 
const target = {
    value: 0,
    increment(val) {
        this.value += val;
        return this.value;
    }
};

 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'value') {
            print(`Accessing value: ${Reflect.get(target, prop, receiver)}`);
        }
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting value: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
    print('Starting data processing...');
    await processData(dataGenerator());
    
     
    print(`Initial proxy value: ${proxy.value}`);
    proxy.increment(5);
    print(`After increment: ${proxy.value}`);
})();
