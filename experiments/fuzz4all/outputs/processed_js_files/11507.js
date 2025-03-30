 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: "John Doe", age: 30, admin: true });
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const data = await fetchData();

         
        const handler = {
            get: (target, prop) => {
                print(`Accessing property: ${prop}`);
                return prop in target ? target[prop] : 'Property does not exist';
            }
        };

        const proxyData = new Proxy(data, handler);

        print(proxyData.user);   
        print(proxyData.age);
        print(proxyData.nonExistentProp);   
    } catch (error) {
        console.error("Error processing data:", error);
    }
};

 
(async () => {
    await processData();
})();
