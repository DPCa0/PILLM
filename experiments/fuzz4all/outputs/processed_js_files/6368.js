 
const { EventEmitter } = require('events');

 
async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30 });
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

 
class User extends EventEmitter {
    constructor(data) {
        super();
        this.data = new Proxy(data, handler);
    }

    updateAge(newAge) {
        this.data.age = newAge;
        this.emit('ageUpdated', this.data.age);
    }
}

 
(async () => {
    const userData = await fetchUserData();
    const user = new User(userData);

    user.on('ageUpdated', (newAge) => {
        print(`User's age updated to: ${newAge}`);
    });

    print(`Initial user data: ${JSON.stringify(user.data)}`);

    user.updateAge(31);  
})();
