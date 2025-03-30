const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: `User${userId}`, age: 20 + userId });
        }, 1000);
    });
};

const getUserDataWithMetadata = async (userId) => {
     
    const user = await fetchUserData(userId);
    const handler = {
        get: (target, prop) => {
            if (prop === 'metadata') {
                return { fetchedAt: new Date(), cached: false };
            }
            return target[prop];
        },
        set: (target, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };
    return new Proxy(user, handler);
};

const printUserInfo = async (userId) => {
    const userProxy = await getUserDataWithMetadata(userId);

     
    const { id, name, age, metadata } = userProxy;
    print(`User ID: ${id}, Name: ${name}, Age: ${age}`);
    print(`Metadata:`, metadata);

     
    userProxy.age = 30;
    print(`Updated Age: ${userProxy.age}`);
};

printUserInfo(1);
