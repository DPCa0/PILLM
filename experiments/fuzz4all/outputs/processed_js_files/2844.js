 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchUserData(userId) {
     
    await delay(1000);
    
     
    return {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            zip: '12345'
        },
        hobbies: ['coding', 'chess', 'hiking']
    };
}

 
async function displayUserData(userId) {
    try {
         
        const userData = await fetchUserData(userId);
        
         
        const { name, email, address: { street, city }, hobbies } = userData;
        
         
        const newHobbies = [...hobbies, 'gaming'];
        
         
        print(`Name: ${name}`);
        print(`Email: ${email}`);
        print(`Address: ${street}, ${city}`);
        print(`Hobbies: ${newHobbies.join(', ')}`);
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
displayUserData(1);
