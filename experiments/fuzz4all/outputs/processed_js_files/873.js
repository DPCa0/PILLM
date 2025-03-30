 
const databaseSimulator = {
    users: [
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 2, name: 'Bob', role: 'user' },
        { id: 3, name: 'Charlie', role: 'user' }
    ]
};

const handler = {
    get(target, prop, receiver) {
        if (prop === 'fetchUser') {
            return async function (id) {
                const user = await new Promise(resolve =>
                    setTimeout(() => resolve(target.users.find(user => user.id === id)), 1000)
                );
                return user ? { ...user, [Symbol.for('role')]: user.role } : null;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const proxyDatabase = new Proxy(databaseSimulator, handler);

async function getUserInfo(id) {
    const user = await proxyDatabase.fetchUser(id);
    if (!user) {
        print(`User with ID ${id} not found.`);
        return;
    }
    const roleSymbol = Symbol.for('role');
    print(`User Name: ${user.name}`);
    print(`User Role: ${user[roleSymbol]}`);
}

(async () => {
    await getUserInfo(1);  
    await getUserInfo(2);  
    await getUserInfo(4);  
})();
