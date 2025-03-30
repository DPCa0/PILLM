 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { user: 'John Doe', age: 30, city: 'New York' };
        Math.random() > 0.5 ? resolve(data) : reject('Fetch error');
    }, 1000);
});

 
async function getUserData() {
    try {
        const data = await fetchData();
        const { user, age, city } = data;  
        print(`User: ${user}, Age: ${age}, City: ${city}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return Reflect.get(target, prop);
        } else {
            print(`Property "${prop}" does not exist`);
            return null;
        }
    },
    set(target, prop, value) {
        print(`Setting value ${value} to property "${prop}"`);
        return Reflect.set(target, prop, value);
    }
};

const user = {
    name: 'Jane Doe',
    age: 28
};

const proxyUser = new Proxy(user, handler);

 
print(proxyUser.name);  
print(proxyUser.location);  

proxyUser.age = 29;

 
getUserData();
