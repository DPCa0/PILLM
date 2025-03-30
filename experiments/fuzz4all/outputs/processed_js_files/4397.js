const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John Doe", age: 30 });
        }, 1000);
    });
};

class User {
    constructor({ id, name, age }) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    get profile() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }

    static async fetchAndCreate(userId) {
        const data = await fetchUserData(userId);
        return new User(data);
    }
}

const cacheProxy = (fn) => {
    const cache = new Map();
    return async (arg) => {
        if (!cache.has(arg)) {
            const result = await fn(arg);
            cache.set(arg, result);
        }
        return cache.get(arg);
    };
};

const proxiedFetchAndCreate = cacheProxy(User.fetchAndCreate);

(async () => {
    const user = await proxiedFetchAndCreate(1);
    print(user.profile);  

    const userAgain = await proxiedFetchAndCreate(1);
    print(userAgain === user);  
})();
