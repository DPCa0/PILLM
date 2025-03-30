 

 
const loggingHandler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            print(`Property ${property} does not exist`);
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const obj = new Proxy({}, loggingHandler);

 
async function* asyncDataGenerator() {
    const data = [1, 2, 3, 4, 5];
    for (const item of data) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
(async () => {
    for await (const num of asyncDataGenerator()) {
        obj[`value_${num}`] = num;
        print(`Processed value: ${num}`);
    }
})();

 
setTimeout(() => print('Final Object State:', obj), 6000);
