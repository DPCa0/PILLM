 
const getUserProfile = async (userId) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve({ id: 1, name: 'John Doe', age: 30 });
            } else {
                reject('User not found');
            }
        }, 1000);
    });
};

 
const displayUserProfile = async (userId) => {
    try {
         
        const user = await getUserProfile(userId);

         
        const { name, age } = user;
        
         
        print(`User Name: ${name}, Age: ${age}`);

         
        print(`Location: ${user.location ?? 'Location not available'}`);
    } catch (error) {
         
        console.error('Error:', error);
    }
};

 
(async () => {
    await displayUserProfile(1);  
    await displayUserProfile(2);  
})();
