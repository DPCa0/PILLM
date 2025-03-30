 

 
async function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ userId, name: `User ${userId}`, age: 20 + userId });
        }, 1000);
    });
}

 
function* userDataGenerator(userIds) {
    for (let id of userIds) {
        yield fetchUserData(id);
    }
}

 
class UserManager {
    #users = new Map();

    async loadUsers(userIds) {
        const generator = userDataGenerator(userIds);
        for (let userPromise of generator) {
            const user = await userPromise;
            this.#users.set(user.userId, user);
        }
    }

    getUser(userId) {
        return this.#users.get(userId);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop.startsWith('get')) {
            print(`Accessing method: ${prop}`);
        }
        return Reflect.get(target, prop, receiver);
    }
};

(async () => {
     
    const userManager = new Proxy(new UserManager(), handler);
    await userManager.loadUsers([1, 2, 3]);

    print(userManager.getUser(1));  
    print(userManager.getUser(2));  
    print(userManager.getUser(3));  
})();
