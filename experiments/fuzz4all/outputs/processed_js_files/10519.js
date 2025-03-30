 

 
function* randomDelayGenerator() {
    while (true) {
        const delay = Math.floor(Math.random() * 1000);
        yield new Promise(resolve => setTimeout(() => resolve(`Resolved after ${delay}ms`), delay));
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

const generatorProxy = new Proxy(randomDelayGenerator(), handler);

(async function main() {
    const iterator = generatorProxy;  
    for (let i = 0; i < 5; i++) {
        const promise = iterator.next().value;
         
        print(await promise);
    }
})();

print("All operations are async and non-blocking");
