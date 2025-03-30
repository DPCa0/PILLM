 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncDataStream() {
    for (let i = 0; i < 5; i++) {
        await delay(1000);  
        yield i;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const proxiedObj = new Proxy({value: 0}, handler);

(async function() {
    const stream = asyncDataStream();

    for await (let number of stream) {
        print(`Received number: ${number}`);
        proxiedObj.value = number * 10;
        print(`Proxied value: ${proxiedObj.value}`);
    }
})();
