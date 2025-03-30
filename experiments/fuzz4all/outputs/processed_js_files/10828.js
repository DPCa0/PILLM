 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        } else {
            throw new Error(`Property ${prop} not found`);
        }
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { name: 'Complex Object', version: '1.0' };
const proxyObject = new Proxy(targetObject, handler);

 
let config = {
    api: {
        endpoint: 'https://api.example.com',
        timeout: 5000
    }
};

const apiUrl = config.api?.endpoint ?? 'https://default.api.com';
print(`API URL: ${apiUrl}`);

 
function* generateValues() {
    yield 'First value';
    yield 'Second value';
    yield 'Third value';
}

const generator = generateValues();
for (const value of generator) {
    print(value);
}

 
const userName = 'John Doe';
print(`Hello, ${userName}! Welcome to advanced JavaScript.`);

 
const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const { id, ...rest } = user;
print(`User ID: ${id}`);
print('User Info:', rest);

 
(async () => {
    try {
        const data = await fetchData(apiUrl);
        print('Fetched Data:', data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
try {
    print(proxyObject.name);   
    proxyObject.version = '2.0';     
    print(proxyObject.version);
    console.log(proxy