 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchAndLogUserData(userId) {
    try {
         
        await delay(1000);

         
        const response = await fetch(`https: 
        if (!response.ok) throw new Error('Network response was not ok');

         
        const { name, email, address: { city } } = await response.json();

         
        print(`User: ${name}, Email: ${email}, City: ${city}`);

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
fetchAndLogUserData(1);
