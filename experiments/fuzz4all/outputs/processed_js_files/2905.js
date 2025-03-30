 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Jane Doe',
                age: 28,
                email: 'janedoe@example.com',
                preferences: {
                    theme: 'dark',
                    notifications: true
                }
            });
        }, 1000);
    });
}

 
const loggingHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Property '${property}' accessed, value: ${target[property]}`);
            return target[property];
        }
        throw new Error(`Property '${property}' does not exist.`);
    }
};

 
(async function() {
    try {
         
        const { name, preferences: { theme } } = await fetchData();
        print(`User name is: ${name}`);
        print(`Preferred theme is: ${theme}`);

         
        const userProxy = new Proxy(await fetchData(), loggingHandler);

         
        print(`User email is: ${userProxy.email}`);
        print(`User age is: ${userProxy.age}`);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
