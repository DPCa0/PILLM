 

 
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: 'John Doe', email: 'john.doe@example.com' });
            } else {
                reject(new Error('Invalid User ID'));
            }
        }, 1000);
    });
}

 
async function getUserData(userId) {
    try {
        const data = await fetchUserData(userId);
        print('User Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
const userProxyHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessed property "${property}" with value: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property "${property}" does not exist`);
        }
    }
};

 
(async () => {
    const user = await getUserData(1);
    
    if (user) {
         
        const proxiedUser = new Proxy(user, userProxyHandler);
        
         
        print(proxiedUser.name);   
        print(proxiedUser.age);    
    }
})();
