 

 
async function* asyncCounter(max) {
    for (let i = 0; i <= max; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
}

 
const resultsMap = new Map();

 
const handler = {
    set(target, key, value) {
        print(`Setting ${key} = ${value}`);
        return Reflect.set(target, key, value);  
    },
    get(target, key) {
        print(`Getting the value of ${key}`);
        return Reflect.get(target, key);
    }
};

const proxyMap = new Proxy(resultsMap, handler);

 
async function main() {
    print('Starting async iteration...');
    const asyncGen = asyncCounter(5);

    for await (const num of asyncGen) {
        proxyMap.set(num, `Value ${num * 2}`);  
    }

     
    print('Retrieving values...');
    for (let i = 0; i <= 5; i++) {
        print(proxyMap.get(i));  
    }
}

main().catch(console.error);
