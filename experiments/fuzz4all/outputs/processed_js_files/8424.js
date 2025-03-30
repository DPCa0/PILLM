 

 
async function* asyncNumberGenerator() {
    for (let i = 1; i <= 5; i++) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
const simpleObject = { message: "Hello, Proxy!" };
const proxy = new Proxy(simpleObject, handler);

 
(async () => {
    print(proxy.message);
    
     
    proxy.message = "Proxy Updated!";
    
    print(proxy.message);
    
    for await (let num of asyncNumberGenerator()) {
        print(num);
    }
    
     
    print(proxy?.nonExistentProp ?? "Default Value");
})();
