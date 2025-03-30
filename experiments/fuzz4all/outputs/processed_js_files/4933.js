 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${String(prop)}`);
            return Reflect.get(...arguments);
        } else {
            throw new Error(`Property ${String(prop)} does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const secretKey = Symbol('secret');
const obj = {
    name: 'Advanced JS',
    [secretKey]: 'top-secret'
};

const proxy = new Proxy(obj, handler);

 
function logDetails({ name, age = 25, profession }) {
    print(`Name: ${name}, Age: ${age}, Profession: ${profession}`);
}

 
async function fetchDataAndProcess() {
    const { processData } = await import('./processModule.js');
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());
    processData(data);
}

 
const user = {
    profile: {
        details: null
    }
};
const userName = user.profile.details?.name ?? 'Default Name';
print(`User Name: ${userName}`);

 
try {
    proxy.name;
    proxy.name = 'New JS';
    logDetails({ name: proxy.name, profession: 'Developer' });
    fetchDataAndProcess();
} catch (error) {
    console.error(error);
}
