 

 
function* numberGenerator() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

 
async function fetchData(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data fetched for number ${num}`);
        }, 1000);
    });
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} not found`);
            return 42;  
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
let obj = { existingProperty: "I'm here!" };
let proxyObj = new Proxy(obj, handler);

 
async function processData() {
    let gen = numberGenerator();
    for (let i = 0; i < 5; i++) {
        let number = gen.next().value;
        proxyObj[number] = await fetchData(number);
        print(proxyObj[number]);
    }
    print(proxyObj.missingProperty);  
}

 
processData();
