 

 
const handler = {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return prop in target ? target[prop] : `No such property: ${prop}`;
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value * 2;  
        return true;
    }
};

const targetObj = { a: 1, b: 2 };
const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.a);   
proxyObj.c = 3;            
print(proxyObj.c);   

 
function* numberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        yield i * i;
    }
}

const gen = numberGenerator(5);
for (const num of gen) {
    print(`Generated square: ${num}`);
}

 
async function fetchData(url) {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);
    
     
    return `Fetched data from ${url}`;
}

async function main() {
    const data = await fetchData('https://example.com');
    print(data);
}

main();
