 

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function printFibonacci(n) {
    const fibGen = fibonacci();
    for (let i = 0; i < n; i++) {
        print(fibGen.next().value);
        await delay(500);  
    }
}

 
const user = {
    name: 'Alice',
    age: 30
};

const handler = {
    get(target, property) {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    },
    set(target, property, value) {
        print(`Property '${property}' has been set to '${value}'.`);
        target[property] = value;
        return true;
    }
};

const proxiedUser = new Proxy(user, handler);

 
(async () => {
     
    print(proxiedUser.name);
    proxiedUser.age = 31;
    
     
    await printFibonacci(10);
})();
