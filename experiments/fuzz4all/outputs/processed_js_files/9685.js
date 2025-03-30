 
async function* fetchDataGenerator() {
    const dataChunks = [
        { id: 1, value: 'chunk1' },
        { id: 2, value: 'chunk2' },
        { id: 3, value: 'chunk3' }
    ];
    for (const chunk of dataChunks) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield chunk;
    }
}

 
const dataLogger = new Proxy({}, {
    get(target, prop) {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} with value: ${value}`);
        target[prop] = value;
        return true;
    }
});

 
const _privateData = new WeakMap();

class ComplexObject {
    constructor(data) {
        _privateData.set(this, data);
    }

    getData() {
        return _privateData.get(this);
    }
}

 
(async () => {
    print("Starting data fetch...");

    for await (let chunk of fetchDataGenerator()) {
        print(`Received: ${chunk.value}`);
        dataLogger[chunk.id] = chunk.value;
    }

     
    const obj = new ComplexObject({ secret: "this is private" });
    print("Private Data:", obj.getData());
})();
