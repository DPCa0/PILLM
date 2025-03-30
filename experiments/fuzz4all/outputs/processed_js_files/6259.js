 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* fetchDataWithDelay() {
    const data = [1, 2, 3, 4, 5];
    for (let item of data) {
        await delay(1000);  
        yield item;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property ${prop} does not exist.`);
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const targetObject = { a: 1, b: 2 };

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.c;  
proxyObject.b = 3;  

 
(async () => {
    print('Fetching data:');
    for await (let value of fetchDataWithDelay()) {
        print(`Received: ${value}`);
    }
})();
