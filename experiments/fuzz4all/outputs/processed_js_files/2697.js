 

 
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function fetchData(generator) {
    for (let value of generator) {
        await new Promise((resolve) => setTimeout(resolve, 500));  
        print(`Fetched data: ${value}`);
    }
}

 
const targetObject = {
    framework: 'JavaScript',
    version: 'ES2023'
};

const handler = {
    get: (obj, prop) => {
        return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
    },
    set: (obj, prop, value) => {
        if (prop === 'version' && value < 'ES2020') {
            console.warn('Warning: You are setting a deprecated version.');
        }
        obj[prop] = value;
        print(`Property ${prop} set to ${value}`);
        return true;
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.framework);  
proxyObject.version = 'ES6';         
print(proxyObject.unknown);    

 
const sequenceGenerator = generateSequence(1, 5);
fetchData(sequenceGenerator).then(() => print('Data fetch completed.'));
