 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: 'Alice', age: 30, city: 'New York' },
                { name: 'Bob', age: 25, city: 'San Francisco' },
                { name: 'Charlie', age: 35, city: 'Los Angeles' },
            ]);
        }, 1000);
    });
};

 
const processUserData = async () => {
    try {
        const users = await fetchData();
        
        users.forEach(({ name, age, city }) => {
            print(`Name: ${name}, Age: ${age}, City: ${city}`);
        });
        
        const over30 = users.filter(({ age }) => age > 30);
        
        print(`Users over 30: ${over30.map(({ name }) => name).join(', ')}`);
    } catch (error) {
        console.error(`Error processing user data: ${error.message}`);
    }
};

 
(async () => {
    await processUserData();
})();
