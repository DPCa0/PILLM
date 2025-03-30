 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncOperation() {
    print("Operation started...");
    await delay(1000);
    print("Operation completed.");
}

 
const targetObject = { message: "Hello, Proxy!" };
const handler = {
    get: (target, prop) => {
        print(`Property ${String(prop)} was accessed.`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property ${String(prop)} was set to ${value}.`);
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(targetObject, handler);
print(proxy.message);   
proxy.message = "Changed via Proxy";   

 
const uniqueKey = Symbol('unique');
const objWithSymbol = {
    [uniqueKey]: "This is a unique symbol key"
};
print(objWithSymbol[uniqueKey]);

 
(() => {
    print("IIFE executed!");
})();

 
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");

const set = new Set(["value1", "value2", "value3"]);

 
const [first, ...rest] = set;
print(first, rest);

asyncOperation();   
