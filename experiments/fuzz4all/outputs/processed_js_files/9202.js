 
const _password = Symbol('password');
class User {
    #username;
    constructor(username, password) {
        this.#username = username;
        this[_password] = this.#encryptPassword(password);
    }

    #encryptPassword(password) {
        return [...password].reverse().join('');
    }

    verifyPassword(password) {
        return this[_password] === this.#encryptPassword(password);
    }

    get username() {
        return this.#username;
    }
}

 
const userHandler = {
    get(target, property) {
        print(`Accessing ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
let user = new User('johnDoe', 'secure123');
user = new Proxy(user, userHandler);

 
async function authenticateUser(user, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user.verifyPassword(password)) {
                resolve('Authentication successful');
            } else {
                reject('Authentication failed');
            }
        }, 1000);
    });
}

 
(async () => {
    print(`Username: ${user.username}`);
    try {
        const message = await authenticateUser(user, 'secure123');
        print(message);
    } catch (error) {
        console.error(error);
    }
})();
