 
(async () => {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    const fetchData = async () => {
        await delay(1000);  
        return { data: { user: { name: 'Alice', age: 30, location: 'Wonderland' } } };
    };

     
    try {
        const { data: { user: { name, age, location } } } = await fetchData();
        
         
        print(`User Info: Name - ${name}, Age - ${age}, Location - ${location}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
