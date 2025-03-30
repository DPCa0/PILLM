 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    name: 'John Doe',
                    age: 30,
                    favorites: {
                        color: 'blue',
                        food: 'pizza',
                    },
                },
                settings: {
                    theme: 'dark',
                    notifications: true,
                },
            });
        }, 1000);
    });
};

 
const handler = {
    get: function (target, property) {
        if (property in target) {
            return target[property];
        } else {
            print(`Property '${property}' does not exist.`);
            return null;
        }
    },
};

 
(async () => {
    try {
        const { user, settings } = await fetchData();  
        const userProxy = new Proxy(user, handler);  

        print(`User: ${userProxy.name}`);  
        print(`Favorite Color: ${userProxy.favorites.color}`);  
        print(`Non-existing property: ${userProxy.nonExistent}`);  

        const greetUser = ({ name }) => `Hello, ${name}!`;  
        print(greetUser(userProxy));  
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
