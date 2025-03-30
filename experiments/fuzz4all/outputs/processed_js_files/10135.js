 
 

 
async function fetchUserData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    const { name, email, address: { city, suite, ...restAddress } } = data;
    return { name, email, city, suite, ...restAddress };
}

 
class User {
    static userCount = 0;

    constructor({ name, email, city, suite }) {
        this._name = name;
        this._email = email;
        this._location = `${suite}, ${city}`;
        User.userCount++;
    }

    get info() {
        return `Name: ${this._name}, Email: ${this._email}, Location: ${this._location}`;
    }

    static getUserCount() {
        return User.userCount;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property "${prop}"`);
        return target[prop];
    }
};

(async () => {
    try {
        const userData = await fetchUserData();
        const user = new User(userData);

         
        const proxiedUser = new Proxy(user, handler);

         
        print(`User Information: ${proxiedUser.info}`);
        print(`Total Users Created: ${User.getUserCount()}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
