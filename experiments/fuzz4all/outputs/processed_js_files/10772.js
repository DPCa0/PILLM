 

 
function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John Doe', age: 30, email: 'johndoe@example.com' });
        }, 1000);
    });
}

 
async function getUserProfile(userId) {
    const { name, email } = await fetchUserData(userId);  
    return { name, email };
}

 
const userHandler = {
    get(target, property) {
        print(`Accessed property "${property}": ${target[property]}`);
        return target[property];
    }
};

(async () => {
    const userProfile = await getUserProfile(1);

     
    const proxiedUserProfile = new Proxy(userProfile, userHandler);

     
    print(`User Name: ${proxiedUserProfile.name}`);
    print(`User Email: ${proxiedUserProfile.email}`);
})();
