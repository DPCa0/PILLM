 

 
const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: `User${userId}`, role: 'Developer' });
        }, 1000);
    });
};

 
const userCache = new Map();

 
const handler = {
    get: (target, prop) => {
        if (target.has(prop)) {
            print(`Fetching from cache for user ${prop}`);
            return target.get(prop);
        }
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Caching data for user ${prop}`);
        return Reflect.set(target, prop, value);
    }
};

const proxyCache = new Proxy(userCache, handler);

 
const getUserData = async (userId) => {
    if (proxyCache.has(userId)) {
        return proxyCache.get(userId);
    }
    const userData = await fetchUserData(userId);
    proxyCache.set(userId, userData);
    return userData;
};

 
(async () => {
    const user1 = await getUserData(1);
    print('User 1:', user1);

    const user2 = await getUserData(2);
    print('User 2:', user2);

     
    const user1Again = await getUserData(1);
    print('User 1 Again:', user1Again);
})();
