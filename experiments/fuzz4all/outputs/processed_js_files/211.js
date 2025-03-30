 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncActions() {
    yield delay(1000).then(() => print("Action 1: Executed after 1 second"));
    yield delay(2000).then(() => print("Action 2: Executed after 2 seconds"));
    yield delay(1000).then(() => print("Action 3: Executed after another 1 second"));
}

 
async function runGenerator(gen) {
    const iterator = gen();
    for (let promise of iterator) {
        await promise;
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property '${prop}'`);
            return obj[prop];
        } else {
            print(`Property '${prop}' does not exist`);
            return undefined;
        }
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const asyncController = new Proxy({
    start: async () => await runGenerator(asyncActions)
}, handler);

 
(async () => {
    await asyncController.start();  
    asyncController.newProp = "Testing Proxy";  
    print(asyncController.newProp);  
    print(asyncController.nonExistentProp);  
})();
