 
(async () => {
     
    const fetchData = () => new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, data: { user: { name: 'Alice', age: 30 }, status: 'active' } });
        }, 1000);
    });

    try {
         
        const { success, data } = await fetchData();
        
         
        const { user: { name, age }, status } = data;
        
        if (success) {
             
            print(`Fetched user data: Name - ${name}, Age - ${age}, Status - ${status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
