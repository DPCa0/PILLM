 

 
const fetchUserData = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const users = [
            { id: 1, name: 'Alice', age: 28 },
            { id: 2, name: 'Bob', age: 34 },
            { id: 3, name: 'Charlie', age: 22 }
        ];
        const user = users.find(user => user.id === id);
        user ? resolve(user) : reject(new Error('User not found'));
    }, 1000);
});

 
const processUser = async (userId) => {
    try {
         
        const { id, name, age } = await fetchUserData(userId);

         
        const greetUser = (name = 'Guest', age = 'unknown') => `Hello, ${name}! You are ${age} years old.`;

         
        print(`User Found: ID: ${id}, Name: ${name}, Age: ${age}`);
        print(greetUser(name, age));
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

 
(async () => {
    for (let id = 1; id <= 4; id++) {
        await processUser(id);
    }
})();
