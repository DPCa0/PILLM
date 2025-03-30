 
const randomDelay = () => new Promise(resolve => {
    setTimeout(resolve, Math.floor(Math.random() * 1000));
});

 
async function* asyncCounter() {
    for (let i = 1; i <= 5; i++) {
        await randomDelay();
        yield i;
    }
}

 
(async () => {
    for await (const number of asyncCounter()) {
        print(`Received number: ${number}`);
    }
    print('Finished processing numbers');
})();

 
const target = {};
const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : `Property '${prop}' does not exist`),
    set: (obj, prop, value) => {
        print(`Setting value '${value}' to '${prop}'`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
proxy.name = "JavaScript";
print(proxy.name);  
print(proxy.nonExistent);  

 
function format(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}<${values[i] || ''}>`, '');
}

const name = "JavaScript";
const version = "ES2021";
print(format`Welcome to ${name} version ${version}!`);
