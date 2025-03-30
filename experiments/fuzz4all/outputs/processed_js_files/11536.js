 
async function fetchUserData(userId) {
    const userPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockUserData = {
                1: { name: 'Alice', age: 28 },
                2: { name: 'Bob', age: 34 },
                3: { name: 'Charlie', age: 22 }
            };
            mockUserData[userId] ? resolve(mockUserData[userId]) : reject('User not found');
        }, 1000);
    });

    try {
        const userData = await userPromise;
        return userData;
    } catch (error) {
        throw new Error(error);
    }
}

 
function createUserProxy(userData) {
    return new Proxy(userData, {
        get(target, property) {
            if (property in target) {
                print(`Getting ${property}: ${target[property]}`);
                return target[property];
            } else {
                console.warn(`Property ${property} does not exist`);
                return undefined;
            }
        },
        set(target, property, value) {
            print(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    });
}

 
(async function main() {
    try {
        const userId = 1;  
        print(`Fetching data for user ${userId}...`);
        const userData = await fetchUserData(userId);
        
        const userProxy = createUserProxy(userData);

         
        print(`User Name: ${userProxy.name}`);
        print(`User Age: ${userProxy.age}`);

        userProxy.age = 29;  
        print(`Updated User Age: ${userProxy.age}`);

    } catch (error) {
        console.error(error.message);
    }
})();
