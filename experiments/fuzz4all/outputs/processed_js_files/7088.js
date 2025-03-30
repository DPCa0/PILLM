 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

 
const logger = {
    get: (obj, prop) => {
        print(`GET ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`SET ${prop} = ${value}`);
        obj[prop] = value;
        return true;
    }
};

const data = new Proxy({ user: "Anonymous" }, logger);

 
(async () => {
    try {
         
        const { name, company } = await fetchData('https://api.github.com/users/octocat');
        print(`Name: ${name}, Company: ${company}`);
        
         
        const module = await import('./someModule.js');
        module.someFunction();

         
        data.user = name;
        print(`Updated user: ${data.user}`);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();

 
const ROLE_ADMIN = Symbol('admin');
const ROLE_USER = Symbol('user');

const roles = new Map();
roles.set(ROLE_ADMIN, { accessLevel: 10 });
roles.set(ROLE_USER, { accessLevel: 1 });

print(roles.get(ROLE_ADMIN).accessLevel);  

 
class Utility {
    static greeting = 'Hello, world!';
    
    static greet() {
        print(this.greeting);
    }
}

Utility.greet();
