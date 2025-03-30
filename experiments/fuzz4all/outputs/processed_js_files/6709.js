 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const targetObject = {
    name: 'JavaScript',
    type: 'Programming Language'
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Data fetched successfully!'), 2000);
    });
}

async function processData() {
    try {
        print(proxy.name);  
        proxy.version = 'ES6';    
        const result = await fetchData();
        print(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
(async () => {
    print('Starting process...');
    await processData();
    print('Process completed.');
})();

 
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const sequence = generateSequence(1, 5);
for (const num of sequence) {
    print(`Generated number: ${num}`);
}

 
const { name, ...rest } = proxy;
print(`Destructured name: ${name}`);
print('Other properties:', rest);
