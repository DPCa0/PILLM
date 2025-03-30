 

 
async function* asyncNumberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return property in target ? target[property] : 42;  
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { x: 10, y: 20 };
const proxyObject = new Proxy(targetObject, handler);

 
async function main() {
    print("Proxy and Generators in action:");
    
     
    print(proxyObject.x);  
    proxyObject.z = 30;  
    print(proxyObject.z);  

     
    const gen = asyncNumberGenerator(5);
    for await (const num of gen) {
        print(`Generated number: ${num}`);
    }
}

 
main();
