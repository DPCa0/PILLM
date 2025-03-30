 

 
function asyncOperation(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* fetchUserData() {
    yield { id: 1, data: asyncOperation(1000).then(() => ({ name: "John Doe" })) };
    yield { id: 2, data: asyncOperation(1500).then(() => ({ name: "Jane Doe" })) };
}

 
const logHandler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const privateData = Symbol("privateData");

 
class User {
    constructor(id, name) {
        this[privateData] = { id, name };
        return new Proxy(this, logHandler);
    }

    get id() {
        return this[privateData].id;
    }

    get name() {
        return this[privateData].name;
    }

    async setName(newName) {
        await asyncOperation(500);  
        this[privateData].name = newName;
    }
}

 
async function processUsers() {
    const generator = fetchUserData();
    for (const userPromise of generator) {
        const userData = await userPromise.data;
        const user = new User(userPromise.id, userData.name);
        print(`User ID: ${user.id}, Name: ${user.name}`);
        
        await user.setName(user.name + " (Updated)");
        print(`Updated User Name: ${user.name}`);
    }
}

 
processUsers();
