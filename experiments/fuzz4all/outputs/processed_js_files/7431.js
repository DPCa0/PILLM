 
import { EventEmitter } from 'events';
import fetch from 'node-fetch';  

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    return data;
}

 
function processUserData({ name, email, phone }) {
    return new Promise((resolve, reject) => {
        if (name && email && phone) {
            resolve(`User: ${name}, Email: ${email}, Phone: ${phone}`);
        } else {
            reject('Incomplete user data');
        }
    });
}

 
class UserManager extends EventEmitter {
    #users = [];

    async addUser(user) {
        try {
            const userData = await processUserData(user);
            this.#users.push(user);
            this.emit('userAdded', userData);
        } catch (error) {
            this.emit('error', error);
        }
    }

    getUserCount() {
        return this.#users.length;
    }
}

 
const userValidationHandler = {
    set(target, prop, value) {
        if (prop === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            throw new Error('Invalid email address');
        }
        target[prop] = value;
        return true;
    }
};

 
(async () => {
    const userManager = new UserManager();
    userManager.on('userAdded', console.log);
    userManager.on('error', console.error);

    const userProxy = new Proxy({}, userValidationHandler);

     
    try {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';  
        const userData = await fetchData(apiUrl);

        userProxy.name = userData.name;
        userProxy.email = userData.email;  
        userProxy.phone = userData.phone;

        await userManager.addUser(userProxy);
        print(`Total Users: ${userManager.getUserCount()}`);
    } catch (error) {
        console.error('Failed to fetch or add user:', error);
    }
})();
