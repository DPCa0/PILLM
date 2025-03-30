 

 
async function* fetchUserData(userIds) {
    for (const id of userIds) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield { id, name: `User${id}`, email: `user${id}@example.com` };
    }
}

 
async function logUserData(userIds) {
    const userGenerator = fetchUserData(userIds);
    for await (const userData of userGenerator) {
        print(`Fetched User:`, userData);
    }
}

 
const userHandler = {
    get(target, property, receiver) {
        if (property === 'secret') {
            return 'Access Denied';
        }
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        if (property === 'email' && !value.includes('@')) {
            throw new Error('Invalid email address');
        }
        return Reflect.set(...arguments);
    }
};

 
function demoProxy() {
    const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        secret: 'Sensitive Information'
    };

    const proxyUser = new Proxy(user, userHandler);

    print('User name:', proxyUser.name);
    print('User secret:', proxyUser.secret);   

    try {
        proxyUser.email = 'invalid-email';   
    } catch (error) {
        console.error(error.message);
    }
}

 
(async () => {
    print('Starting user data fetch:');
    await logUserData([1, 2, 3]);

    print('\nDemo Proxy and Reflect:');
    demoProxy();
})();
