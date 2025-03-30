 

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function mockApiCall(number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Number: ${number}`), Math.random() * 1000);
    });
}

 
async function processRange(generator) {
    for (let num of generator) {
        const result = await mockApiCall(num);
        print(result);
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const obj = new Proxy({ a: 1, b: 2 }, handler);

 
obj.a;  
obj.b = 3;  

 
const generator = range(1, 5);
processRange(generator);
