 
const uniqueKey = Symbol('unique');

 
class User {
    #password;

    constructor(name, password) {
        this.name = name;
        this.#password = password;
    }

     
    static #validatePassword(password) {
        return password.length >= 8;
    }

     
    getPassword(authorized) {
        return authorized ? this.#password : 'Unauthorized';
    }

     
    setPassword(newPassword) {
        if (User.#validatePassword(newPassword)) {
            this.#password = newPassword;
            print('Password updated successfully.');
        } else {
            print('Password must be at least 8 characters long.');
        }
    }
}

 
const logger = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

 
let user = new User('Alice', 's3cur3Pass');
let userProxy = new Proxy(user, logger);

 
let { name: userName, ...rest } = userProxy;
print(`User: ${userName}`, rest);

 
const email = userProxy?.email ?? 'Email not provided';
print(email);

 
const userMap = new Map([
    [uniqueKey, userProxy],
    ['role', 'admin']
]);

for (const [key, value] of userMap) {
    print(`${String(key)}: ${value}`);
}

 
async function fetchUserData() {
     
    return new Promise((resolve) => {
        setTimeout(() => resolve({ status: 'success', data: userProxy }), 2000);
    });
}

(async function main() {
    try {
        const result = await fetchUserData();
        print('User data fetched:', result);
    } catch (error) {
        console.error('Failed to fetch user