 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchUserData = async (userId) => {
    print(`Fetching data for user: ${userId}`);
    await delay(1000);  
    return { id: userId, name: `User${userId}`, age: 20 + userId };
};

 
const userHandler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}" of user ${target.id}`);
        return target[prop];
    }
};

 
const displayUsers = async (userIds) => {
    for (const userId of userIds) {
        const userData = await fetchUserData(userId);
        const userProxy = new Proxy(userData, userHandler);
        print(`User ID: ${userProxy.id}, Name: ${userProxy.name}, Age: ${userProxy.age}`);
    }
};

 
displayUsers([1, 2, 3]);
