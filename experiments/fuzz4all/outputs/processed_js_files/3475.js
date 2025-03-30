 

 
const fetchUserData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: 1, name: 'Alice', age: 30 });
        }, 1000);
    });
};

 
function* userDataGenerator(user) {
    yield user.id;
    yield user.name;
    yield user.age;
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed with value: ${target[prop]}`);
        return target[prop];
    },
};

 
const main = async () => {
    try {
        const userData = await fetchUserData();

         
        const userProxy = new Proxy(userData, handler);

         
        const userGen = userDataGenerator(userProxy);
        for (const info of userGen) {
            print(`User Info: ${info}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
main();
