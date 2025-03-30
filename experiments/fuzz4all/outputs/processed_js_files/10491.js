 
const fetchUserData = (userId) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (userId === 1) {
            resolve({ id: 1, name: 'Alice', age: 25 });
        } else {
            reject('User not found');
        }
    }, 1000);
});

 
const userProxyHandler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
(async () => {
    try {
         
        const moduleUrl = './someModule.js';
        const { someExportedFunction } = await import(moduleUrl);

         
        const userData = await fetchUserData(1);

         
        const user = new Proxy(userData, userProxyHandler);

         
        print(user?.name);
        user.age = 26;
        print(user?.age);

         
        someExportedFunction?.();

    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
