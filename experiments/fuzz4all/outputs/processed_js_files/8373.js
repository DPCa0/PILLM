 
async function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
        await new Promise(resolve => setTimeout(resolve, 50));  
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return prop in target ? target[prop] : `Property ${prop} not found`;
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { name: 'JS' };
const proxy = new Proxy(targetObject, handler);

 
proxy.name;           
proxy.version = 6;    
print(proxy.version);  

 
(async () => {
    const fibGen = fibonacci(10);
    for await (const num of fibGen) {
        print(num);  
    }
})();
