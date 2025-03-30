 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apples', 'bananas', 'grapes']);
        }, 1000);
    });
}

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
async function processData() {
    const data = await fetchData();
    const generator = dataGenerator(data);

    for (const value of generator) {
        print(`Processing: ${value}`);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting property: ${prop}`);
        return prop in target ? target[prop] : null;
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataObject = new Proxy({ fruits: [] }, handler);

 
(async () => {
    await processData();

    dataObject.fruits = ['kiwi', 'mango'];
    print(`Current fruits: ${dataObject.fruits.join(', ')}`);
    print(`Getting non-existing property: ${dataObject.nonExistent}`);
})();
