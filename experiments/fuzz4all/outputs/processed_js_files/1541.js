 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Alice', age: 30, city: 'Wonderland', occupation: 'Explorer' });
        }, 1000);
    });
};

 
const processUserData = async () => {
    try {
         
        const data = await fetchData();
        
         
        const { name, age, ...rest } = data;
        
         
        print(`User's name is ${name} and age is ${age}.`);
        
        // Use spread operator to gather remaining user details
        const additionalInfo = { ...rest };
        
        // Create a new object with more properties
        const userDetails = { ...data, active: true, hobbies: ['Reading', 'Traveling'] };
        
        // Log the full user details object
        print(userDetails);
        
        return additionalInfo;
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

// Execute the processUserData function
processUserData().then((additionalInfo) => {
    // Log additional user information obtained from spread operator
    print('Additional User Info:', additionalInfo);
});
