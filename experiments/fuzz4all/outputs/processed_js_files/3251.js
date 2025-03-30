 
async function fetchUserData(userId) {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

 
const userProxyHandler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
    try {
         
        const userIds = [1, 2, 3];
        
         
        const users = await Promise.all(userIds.map(id => fetchUserData(id)));
        
         
        const SYMBOL_DESCRIPTION = Symbol('description');

         
        const userProxies = users.map(user => new Proxy(user, userProxyHandler));
        
        userProxies.forEach(userProxy => {
            userProxy[SYMBOL_DESCRIPTION] = `User name is ${userProxy.name}`;
            print(userProxy[SYMBOL_DESCRIPTION]);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
main();
