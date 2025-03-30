 

 
const logHandler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} does not exist.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Set property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const person = new Proxy({
    name: 'Alice',
    age: 30
}, logHandler);

 
print(person.name);  
person.age = 31;  

 
function fetchUserData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: 'John Doe', email: 'john.doe@example.com' });
        }, 2000);
    });
}

 
async function* getUserData(ids) {
    for (const id of ids) {
        const data = await fetchUserData(id);
        yield data;
    }
}

 
(async () => {
    const ids = [1, 2, 3];
    const userDataGenerator = getUserData(ids);

    for await (const userData of userDataGenerator) {
        print(userData);
    }
})();
