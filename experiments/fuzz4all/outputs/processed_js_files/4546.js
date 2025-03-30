 
async function fetchUserData(userId) {
     
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`User ${userId} not found`);
    return response.json();
}

 
const userValidator = {
    set: function(target, property, value) {
        if (property === 'name' && typeof value !== 'string') {
            throw new Error('Name must be a string');
        }
        target[property] = value;
        return true;
    }
};

 
function printUserDetails(user) {
    console.log(`User Info: 
    ID: ${user.id}
    Name: ${user.name}
    Email: ${user.email}
    Company: ${user.company.name}`);
}

 
(async () => {
    try {
        const userId = 1;
        let user = await fetchUserData(userId);
        const proxiedUser = new Proxy(user, userValidator);

         
        proxiedUser.name = "John Doe";

         
        printUserDetails(proxiedUser);
    } catch (error) {
        console.error(error.message);
    }
})();
