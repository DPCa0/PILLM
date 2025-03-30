 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Alice',
                age: 30,
                job: 'Engineer',
                location: { city: 'Wonderland', country: 'Dreamland' }
            });
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Property '${prop}' has been accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    try {
         
        const userData = await fetchData();

         
        const { name, age, location: { city: hometown }, ...rest } = userData;

         
        const proxiedUser = new Proxy(userData, handler);

         
        console.log(`User Info:
        Name: ${proxiedUser.name}
        Age: ${proxiedUser.age}
        Hometown: ${proxiedUser.location.city}`);
        
         
        print(`Job: ${proxiedUser.job}`);
        print(`Country: ${proxiedUser.location.country}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
