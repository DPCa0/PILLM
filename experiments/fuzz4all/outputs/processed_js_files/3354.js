 

 
const fetchUserData = (userId = 1) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 34 },
                { id: 3, name: 'Charlie', age: 25 }
            ];
            const user = users.find(u => u.id === userId);
            user ? resolve(user) : reject('User not found');
        }, 1000);
    });
};

 
const logUserData = async (userId) => {
    try {
        const { name, age } = await fetchUserData(userId);
        print(`User found: ${name}, Age: ${age}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
const userHandler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    }
};

 
const userProxy = new Proxy({ id: 1, name: 'Alice', age: 28 }, userHandler);

print(userProxy.name);  

 
function createUser({ name = 'John Doe', age = 18, ...rest } = {}) {
    return { name, age, ...rest };
}

 
const newUser = createUser({ name: 'Daisy', hobby: 'coding', country: 'Wonderland' });
print(newUser);

 
logUserData(2);
