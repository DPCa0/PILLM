 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

 
async function* dataStream() {
    for (let i = 0; i < 5; i++) {
        const data = await fetchData();
        yield data;
    }
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        }
        throw new Error(`Property ${property} does not exist on target object`);
    },
    set(target, property, value) {
        if (typeof value === 'number') {
            target[property] = value;
            return true;
        }
        throw new Error(`Property ${property} must be a number`);
    }
};

 
(async function() {
    const dataObj = new Proxy({}, dataHandler);
    const stream = dataStream();

    for await (let value of stream) {
        print('Fetched:', value);
        dataObj[Date.now()] = value;
    }

    print('Final Data Object:', dataObj);
})();
