 

 
async function fetchUserData(userId) {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John Doe' });
        }, 1000);
    });
}

 
function* userDataGenerator(userIds) {
    for (const id of userIds) {
        yield fetchUserData(id);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Property "${prop}" accessed with value: ${target[prop]}`);
        } else {
            console.warn(`Property "${prop}" does not exist.`);
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
async function processUserData(userIds) {
    const userIterator = userDataGenerator(userIds);
    for (let userPromise of userIterator) {
        const user = await userPromise;
        const proxiedUser = new Proxy(user, handler);
        print(`Processing user: ${proxiedUser.name}`);
    }
}

 
const userIds = [1, 2, 3];
processUserData(userIds);
