 
const SECRET_KEY = Symbol('secretKey');

 
const handler = {
    get(target, prop, receiver) {
        if (prop === SECRET_KEY) {
            return Reflect.get(...arguments)();
        }
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        if (prop === SECRET_KEY) {
            throw new Error('Cannot set the secret key');
        }
        return Reflect.set(...arguments);
    }
};

const secretContainer = new Proxy({
    [SECRET_KEY]: () => 'The secret value'
}, handler);

 
async function fetchSecret() {
    try {
        const secretPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(secretContainer[SECRET_KEY]);
            }, 1000);
        });

        const secretValue = await secretPromise;
        print(`The secret is: ${secretValue}`);
    } catch (error) {
        console.error('Error fetching the secret:', error);
    }
}

 
const complexStructure = {
    info: {
        name: 'Complex Object',
        properties: {
            alpha: 'A',
            beta: 'B',
            gamma: 'C'
        }
    },
    data: [1, 2, 3, 4, 5]
};

const {
    info: {
        name,
        properties: { alpha, ...restProperties }
    },
    data: [first, ...restData]
} = complexStructure;

print(name);            
print(alpha);           
print(restProperties);  
print(first);           
print(restData);        

 
(async () => {
    await fetchSecret();
})();
