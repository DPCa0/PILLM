 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* dataStream() {
    for (let i = 1; i <= 5; i++) {
        await delay(Math.random() * 1000);  
        yield `Data chunk ${i}`;
    }
}

 
const logger = {
    get(target, prop) {
        print(`Getting property '${prop}'`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
let data = new Proxy({ status: 'initialized' }, logger);

(async function() {
    for await (const chunk of dataStream()) {
        print(chunk);
    }
    data.status = 'completed';
    print(`Process status: ${data.status}`);
})();
