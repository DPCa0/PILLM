 

 
function fetchUserData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User${id}`, age: 25 + id });
        }, 1000);
    });
}

 
function createLoggingProxy(target) {
    return new Proxy(target, {
        get(obj, prop) {
            print(`Getting property '${prop}'`);
            return Reflect.get(obj, prop);
        },
        set(obj, prop, value) {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(obj, prop, value);
        }
    });
}

 
async function getUserData(id) {
    try {
        print(`Fetching data for user ID: ${id}`);
        const userData = await fetchUserData(id);
        const proxyUserData = createLoggingProxy(userData);
        
        print('User data retrieved:', proxyUserData);
        print(`Name of the user is: ${proxyUserData.name}`);
        print(`Age of the user is: ${proxyUserData.age}`);
        
         
        proxyUserData.age += 1;
        print(`Updated age is now: ${proxyUserData.age}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
getUserData(5);
