 
const PRIVATE_DATA = Symbol('privateData');

 
class User {
    #name;
    #age;
    
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
        this[PRIVATE_DATA] = { secret: 'This is a secret!' };
    }
    
     
    getUserInfo() {
        return `Name: ${this.#name}, Age: ${this.#age}, ${this.#getSecret()}`;
    }
    
     
    #getSecret() {
        return this[PRIVATE_DATA].secret;
    }
}

 
const userHandler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessed property: ${property}`);
            return target[property];
        }
        throw new Error(`Property ${property} does not exist`);
    }
};

 
async function fetchData() {
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Data fetched successfully!'), 1000);
    });
    const result = await dataPromise;
    print(result);
}

 
const user = new Proxy(new User('John Doe', 30), userHandler);

 
const userDetails = { id: 1, ...user };
print(userDetails);

 
print(user.getUserInfo());

 
fetchData();
