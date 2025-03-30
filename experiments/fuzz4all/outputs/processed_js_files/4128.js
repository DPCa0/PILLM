class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        print(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
}

const userProxyHandler = {
    get: function(target, prop, receiver) {
        if (prop === 'age') {
            print('Age property accessed');
        }
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('Age must be an integer');
            }
            if (value <= 0) {
                throw new RangeError('Age must be positive');
            }
        }
        target[prop] = value;
        return true;
    }
};

function* userGenerator(users) {
    for (let user of users) {
        yield user;
    }
}

const users = [
    new User('Alice', 30),
    new User('Bob', 25),
    new User('Charlie', 35)
].map(user => new Proxy(user, userProxyHandler));

const iterableUsers = {
    [Symbol.iterator]: function() {
        return userGenerator(users);
    }
};

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

(async () => {
    print('Fetching external data...');
    try {
        const data = await fetchData('https: 
        print('Data fetched:', data.slice(0, 3));  
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    
    for (const user of iterableUsers) {
        user.greet();
        try {
            user.age += 1;  
        } catch (e) {
            console.error(e);
        }
    }
})();
