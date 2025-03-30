 

 
async function* fetchUserData(users) {
    for (const user of users) {
        yield await fetch(`https: 
            .then(response => response.json());
    }
}

 
const userHandler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function displayUserData(userIds) {
    const userGen = fetchUserData(userIds);
    for await (const user of userGen) {
        const proxiedUser = new Proxy(user, userHandler);
        const { name, email } = proxiedUser;  
        print(`Name: ${name}, Email: ${email}`);
    }
}

 
const userIds = [1, 2, 3];
displayUserData(userIds).catch(console.error);
