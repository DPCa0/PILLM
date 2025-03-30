 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const greetUsers = (message, ...users) => {
    users.forEach(({ name, age }) => {
        print(`${message}, ${name}! You are ${age} years old.`);
    });
};

 
(async () => {
    try {
        print('Initializing greetings...');
        
         
        const userSet = new Set([{name: 'Alice', age: 30}, {name: 'Bob', age: 25}]);
        const userMap = new Map();
        
        userSet.forEach(user => {
             
            userMap.set(user.name, user);
        });

        await delay(1000);  
        greetUsers('Hello', ...userMap.values());

         
        const weakMap = new WeakMap();
        const secretKey = {};
        weakMap.set(secretKey, 'This is a secret value');

        if (weakMap.has(secretKey)) {
            print('Secret:', weakMap.get(secretKey));
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        print('Greeting process completed.');
    }
})();
