 
const fetchUserData = async () => {
    const fakeApiCall = new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 34 },
                { id: 3, name: 'Charlie', age: 23 }
            ]);
        }, 1000);
    });

    try {
        const users = await fakeApiCall;
        
        const adults = users.filter(({ age }) => age >= 30);
        const formattedUsers = adults.map(({ id, name }) => ({ id, userName: name.toUpperCase() }));

        print('Formatted User Data:', JSON.stringify(formattedUsers, null, 2));
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

fetchUserData();
