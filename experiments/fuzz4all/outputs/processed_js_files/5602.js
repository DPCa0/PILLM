 
const handler = {
    get: (target, prop) => prop in target ? target[prop] : `Property ${prop} not found`,
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            target[prop] = value.trim();
            return true;
        }
        throw new TypeError('Value must be a string');
    }
};

 
const user = new Proxy({}, handler);

 
async function getData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/users/1'
    ];

    try {
        const results = await Promise.allSettled(urls.map(url => fetch(url).then(res => res.json())));
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                print(`Response from URL ${index + 1}:`, result.value);
            } else {
                console.error(`Failed to fetch URL ${index + 1}:`, result.reason);
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const generateID = idGenerator();

 
function logMethod(target, name, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        print(`Calling ${name} with arguments:`, args);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

class Order {
    constructor() {
        this.orderId = generateID.next().value;
    }

    @logMethod
    placeOrder(item) {
        print(`Order ${this.orderId} placed for: ${item}`);
    }
}

 
user.name = ' Alice ';
user.age = 30;  

print(user.name);
print(user.age);

getData();

const order1 = new Order();
order1.placeOrder('Laptop');
