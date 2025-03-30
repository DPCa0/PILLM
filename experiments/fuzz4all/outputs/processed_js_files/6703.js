 
class User {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    get info() {
        return this.#getInfo();
    }

    #getInfo() {
        return `Name: ${this.#name}, Age: ${this.#age}`;
    }
}

 
const UserProxyHandler = {
    construct(target, args) {
        if (typeof args[0] !== 'string' || typeof args[1] !== 'number') {
            throw new TypeError('Invalid arguments');
        }
        return new target(...args);
    }
};

 
const UserProxy = new Proxy(User, UserProxyHandler);

 
async function* fetchUserData(user) {
    yield await new Promise((resolve) => setTimeout(() => resolve(user.info), 1000));
}

 
(async function main() {
    try {
        const user = new UserProxy('Alice', 30);
        print('Creating user...');

        for await (const userInfo of fetchUserData(user)) {
            print('User Data:', userInfo);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
