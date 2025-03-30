 

 
const loggerProxy = (obj) => new Proxy(obj, {
    get(target, prop, receiver) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
});

const user = loggerProxy({
    name: 'Alice',
    age: 30
});

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Bob',
                age: 25
            });
        }, 1000);
    });
}

 
async function displayUserData() {
    print('Fetching user data...');
    const data = await fetchUserData();
    print('User data fetched:', data);
}

 
async function main() {
    user.name;   
    user.age = 31;   

    const gen = idGenerator();
    print('Generated ID:', gen.next().value);
    print('Generated ID:', gen.next().value);

    await displayUserData();
}

main();
