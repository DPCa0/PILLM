 

 
const mockApiData = {
    user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
    }
};

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve(mockApiData), 1000);
});

 
async function fetchUser() {
    try {
        print("Fetching user data...");
        const data = await fetchData();   
        print("Data fetched:", data);

         
        const handler = {
            get(target, property) {
                if (property in target) {
                    print(`Accessing property "${property}": ${target[property]}`);
                    return target[property];
                } else {
                    console.warn(`Property "${property}" does not exist.`);
                }
            }
        };

         
        const proxiedUser = new Proxy(data.user, handler);

         
        print(`User Name: ${proxiedUser.name}`);
        print(`User Email: ${proxiedUser.email}`);
        print(`Non-existent Property: ${proxiedUser.age}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
(async () => {
    await fetchUser();
})();
