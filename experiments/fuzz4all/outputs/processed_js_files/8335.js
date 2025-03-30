(async function() {
     
    const userSet = new Set(['Alice', 'Bob', 'Charlie']);
    const scoreMap = new Map([['Alice', 90], ['Bob', 80], ['Charlie', 85]]);
    const metaWeakMap = new WeakMap();
    
    class User {
        constructor(name) {
            this.name = name;
            metaWeakMap.set(this, { loaded: false });
        }

        load() {
            return new Promise(resolve => {
                setTimeout(() => {
                    metaWeakMap.set(this, { loaded: true });
                    resolve(`User ${this.name} loaded`);
                }, 1000);
            });
        }
    }

     
    const userProxyHandler = {
        get: (target, prop) => {
            if (prop === 'greet') {
                return `Hello, ${target.name}!`;
            }
            return target[prop];
        }
    };

     
    const _id = Symbol('id');
    class SecureUser extends User {
        constructor(name, id) {
            super(name);
            this[_id] = id;
        }

        getId() {
            return this[_id];
        }
    }

     
    async function* loadUsers(users) {
        for (const user of users) {
            yield user.load();
        }
    }

    const alice = new SecureUser('Alice', 123);
    const bob = new SecureUser('Bob', 456);
    const userArray = [alice, bob].map(user => new Proxy(user, userProxyHandler));

    for await (const message of loadUsers(userArray)) {
        print(message);
    }

     
    for (const { name, greet } of userArray) {
        print(`${greet} Your score is ${scoreMap.get(name)}.`);
    }

     
    const charlie = new User('Charlie');
    Reflect.set(charlie, 'age', 30);
    print(`Charlie is ${Reflect.get(charlie, 'age')} years old.`);
})();
