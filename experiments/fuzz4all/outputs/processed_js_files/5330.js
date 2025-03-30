 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { name: "John Doe", age: 30 },
                settings: { theme: "dark", notifications: true }
            });
        }, 1000);
    });
};

 
const processUserData = async () => {
    try {
        const { user, settings } = await fetchData();  
        const { name, ...rest } = user;  
        print(`Hello, ${name}!`);  
        print('User Details:', rest);
        
        const updatedSettings = { ...settings, theme: "light" };  
        print('Updated Settings:', updatedSettings);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    await processUserData();
})();
