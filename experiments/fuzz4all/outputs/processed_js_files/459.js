 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function printWithDelay(msgs) {
    for (let msg of msgs) {
        print(msg);
        await delay(1000);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop);
        } else {
            return `Property ${prop} not found`;
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const targetObj = {
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b;
    }
};

 
const proxyObj = new Proxy(targetObj, handler);

 
print(proxyObj.a);          
proxyObj.b = 30;                  
print(proxyObj.sum());      

 
printWithDelay(["Hello", "This", "is", "a", "proxy", "example"]);
