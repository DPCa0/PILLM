 

const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ name: 'Alice', age: 25, location: 'Wonderland' });
    }, 1000);
});

const processUserData = async () => {
    try {
        const userData = await fetchData();
        const { name, ...otherDetails } = userData;
        
         
        const completeData = {
            greeting: `Hello, ${name}!`,
            ...otherDetails
        };

        print(completeData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    await processUserData();
})();
