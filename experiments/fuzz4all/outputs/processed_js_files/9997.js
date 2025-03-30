 
async function fetchUserData(userId) {
     
    const fetchUserDetails = new Promise((resolve, reject) => {
        setTimeout(() => {
            const userDetails = {
                id: userId,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                address: {
                    city: 'New York',
                    country: 'USA',
                },
            };
            resolve(userDetails);
        }, 1000);
    });

     
    const userData = await fetchUserDetails;
    return userData;
}

(async () => {
    try {
        const userId = 1;
        const { name, email, address: { city, country } } = await fetchUserData(userId);

         
        console.log(`User Details:
        Name: ${name}
        Email: ${email}
        Location: ${city}, ${country}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
})();
