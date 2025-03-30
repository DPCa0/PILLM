 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ name: 'Alice', age: 30, role: 'Engineer' });
    }, 1000);
});

 
async function getUserData() {
    const user = await fetchData();
     
    const { name, age, role } = user;
    print(`User: ${name}, Age: ${age}, Role: ${role}`);
    return user;
}

 
const userProxy = new Proxy({}, {
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    },
    get(target, prop) {
        print(`Getting ${prop}`);
        return target[prop];
    }
});

 
(async () => {
    const user = await getUserData();
    Object.assign(userProxy, user);

     
    print(userProxy.name);  
    userProxy.age = 31;           
})();
