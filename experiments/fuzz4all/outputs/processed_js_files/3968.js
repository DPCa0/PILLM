 
async function fetchUserData(userIds) {
     
    const fetchUser = (id) => new Promise(resolve => 
        setTimeout(() => resolve({ id, name: `User${id}` }), Math.random() * 1000)
    );

     
    const userPromises = userIds.map(id => fetchUser(id));
    return await Promise.all(userPromises);
}

 
const createUserLogger = (user) => new Proxy(user, {
    get(target, property) {
        print(`Accessing property '${property}' with value '${target[property]}'`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value);
    }
});

 
(async () => {
    const userIds = [1, 2, 3, 4, 5];
    const users = await fetchUserData(userIds);

     
    const [firstUser, ...restUsers] = users;

     
    const proxiedUser = createUserLogger(firstUser);
    print(proxiedUser.name);  
    proxiedUser.age = 30;  

    print('All Users:', users);
    print('Rest of Users:', restUsers);
})();
