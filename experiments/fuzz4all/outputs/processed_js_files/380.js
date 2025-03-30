 

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function asyncOperation(number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Processed ${number}`);
        }, Math.random() * 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

const data = { a: 1, b: 2, c: 3 };
const proxyData = new Proxy(data, handler);

 
function format(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

(async function main() {
    print(proxyData.a);   
    
    const gen = range(1, 5);
    const promises = [];
    for (let value of gen) {
        promises.push(asyncOperation(value));
    }
    
    const results = await Promise.all(promises);
    for (let result of results) {
        print(result);
    }
    
    const name = "JavaScript";
    print(format`Welcome to advanced ${name} programming!`);
})();
