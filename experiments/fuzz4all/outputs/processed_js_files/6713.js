 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { name: 'Alice', age: 25 },
                location: { city: 'Wonderland', coordinates: { lat: 51.5074, lon: 0.1278 } }
            });
        }, 1000);
    });
};

 
async function processUserData() {
    try {
         
        const { user, location } = await fetchData();
        
         
        const { name, age } = user;
        const { city, coordinates: { lat, lon } } = location;

         
        const message = `User ${name} is ${age} years old and lives in ${city} (lat: ${lat}, lon: ${lon}).`;
        print(message);
    } catch (error) {
        console.error('Error processing user data:', error);
    }
}

 
processUserData();
