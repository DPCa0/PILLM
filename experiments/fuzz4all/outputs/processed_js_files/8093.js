 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: Math.random() * 100 }), 1000);
});

 
async function* dataStream() {
    while (true) {
        const result = await fetchData();
        yield result.data;
    }
}

 
const dataLogger = new Proxy({}, {
    get(target, prop) {
        print(`Accessing property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
});

(async () => {
    const iterator = dataStream();
    let counter = 0;

    while (counter < 5) {
        const { value } = await iterator.next();
        dataLogger[`value${counter}`] = value.toFixed(2);
        print(`Logged value: ${dataLogger[`value${counter}`]}`);
        counter++;
    }
})();
