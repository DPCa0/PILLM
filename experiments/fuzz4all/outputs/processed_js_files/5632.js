 

const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ user: 'Alice', age: 30, profession: 'Developer' }), 1000);
});

const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property ${property}`);
            return target[property];
        }
        throw new Error(`Property ${property} does not exist.`);
    }
};

(async () => {
    try {
        const data = await fetchData();
        const userProxy = new Proxy(data, handler);
        const { user, age, profession } = userProxy;

        console.log(`User Details:
        Name: ${user}
        Age: ${age}
        Profession: ${profession}`);

         
        print(userProxy.nonExistentProperty);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
