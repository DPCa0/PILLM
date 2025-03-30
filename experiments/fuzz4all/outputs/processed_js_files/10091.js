 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name: 'Alice', age: 30, occupation: 'Developer' }), 1000);
    });
};

 
const processUserData = async () => {
    const { name, ...rest } = await fetchData();
    return { name: name.toUpperCase(), ...rest };
};

 
const logHandler = {
    get: (target, property) => {
        print(`Property "${property}" was accessed.`);
        return target[property];
    }
};

 
(async () => {
    const userData = await processUserData();
    const proxiedData = new Proxy(userData, logHandler);

     
    print(`User Name: ${proxiedData.name}`);
    print(`User Age: ${proxiedData.age}`);
    print(`User Occupation: ${proxiedData.occupation}`);
})();
