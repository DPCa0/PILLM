 

 
const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ name: 'Alice', age: 30, location: { city: 'Wonderland', country: 'Fantasy' } });
    }, 1000);
});

 
const displayUserData = async () => {
    try {
         
        const user = await fetchUserData();

         
        const { name, age, location: { city, country } } = user;
        print(`User Info: Name: ${name}, Age: ${age}, Location: ${city}, ${country}`);

         
        const handler = {
            get(target, property) {
                print(`Accessed property "${property}"`);
                return target[property];
            }
        };

         
        const proxiedUser = new Proxy(user, handler);
        print(`Access through Proxy: ${proxiedUser.name}, ${proxiedUser.age}`);
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
displayUserData();
