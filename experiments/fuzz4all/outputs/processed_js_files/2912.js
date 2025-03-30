 

 
const fetchData = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: `User${userId}`,
                email: `user${userId}@example.com`,
            });
        }, 1000);
    });
};

 
const userProxyHandler = {
    get: (target, prop) => {
        print(`Accessed property ${prop} with value ${target[prop]}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Set property ${prop} to value ${value}`);
        target[prop] = value;
        return true;
    },
};

 
const getUserInfo = async (userId) => {
    try {
         
        const userData = await fetchData(userId);
        
         
        const proxiedUserData = new Proxy(userData, userProxyHandler);

         
        print(`User Info: ${proxiedUserData.name}, ${proxiedUserData.email}`);

         
        proxiedUserData.email = `new-email${userId}@example.com`;

         
        return `Updated User Info: ${proxiedUserData.name}, ${proxiedUserData.email}`;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
getUserInfo(1).then(console.log);
