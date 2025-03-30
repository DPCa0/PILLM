 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 30, occupation: 'Engineer' }), 1000);
});

 
async function getUserProfile() {
    try {
         
        const userData = await fetchData();
        
         
        const { name, age, occupation } = userData;
        
         
        return `Name: ${name}, Age: ${age}, Occupation: ${occupation}`;
    } catch (error) {
        return 'Error fetching user profile';
    }
}

 
function displayProfile(fetchProfileFn) {
    fetchProfileFn().then(profile => {
         
        print(`User Profile:\n${profile}`);
    });
}

 
displayProfile(getUserProfile);
