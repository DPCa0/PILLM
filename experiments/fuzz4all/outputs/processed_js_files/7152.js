 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const capitalize = str => str.replace(/\b\w/g, char => char.toUpperCase());

 
const handler = {
    get(target, prop) {
        print(`Getting ${String(prop)}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${String(prop)} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const data = {
    message: "hello, world!"
};

 
const proxyData = new Proxy(data, handler);

 
async function runComplexOperations() {
     
    let message = proxyData.message.toUpperCase();

     
    const [result1, result2] = await Promise.all([
        delay(1000).then(() => "Operation 1 complete"),
        delay(500).then(() => "Operation 2 complete")
    ]);

     
    print(result1, result2);

     
    proxyData.transformedMessage = capitalize(message);
    print(proxyData.transformedMessage);
}

 
runComplexOperations();
