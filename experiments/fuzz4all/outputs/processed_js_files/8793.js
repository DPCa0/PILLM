 

 
async function* fetchUserData(userIds) {
    for (const id of userIds) {
        const response = await fetch(`https: 
        yield response.json();
    }
}

 
const createCounter = () => {
    let count = 0;
    return () => ++count;
};

const counter = createCounter();

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property ${property} not found`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const user = new Proxy({}, handler);

 
(async () => {
    const userIds = [1, 2, 3];
    for await (const userData of fetchUserData(userIds)) {
        print('Fetched User:', userData);

         
        user.name = userData.name;
        user.email = userData.email;

         
        print(`Current count is: ${counter()}`);
    }
})();
