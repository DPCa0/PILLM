 

 
const handler = {
    get: function(target, property) {
        print(`Accessing property: ${property}`);
        return Reflect.get(...arguments);
    },
    set: function(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const target = {
    message1: "Hello",
    message2: "World"
};

 
const proxy = new Proxy(target, handler);

 
async function delayedLog() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(1000);
    print(`${proxy.message1}, ${proxy.message2}!`);   

    await delay(1000);
    proxy.message2 = "JavaScript";   

    await delay(1000);
    print(`${proxy.message1}, ${proxy.message2}!`);
}

 
delayedLog();
