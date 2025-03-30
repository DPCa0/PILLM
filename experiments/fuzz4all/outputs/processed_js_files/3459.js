 

const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = {
                1: { name: 'Alice', age: 25 },
                2: { name: 'Bob', age: 30 },
            };
            resolve(users[userId]);
        }, 1000);
    });
};

const logUserDetails = async (userId) => {
    try {
        const { name, age } = await fetchUserData(userId);
        print(`User Details: Name: ${name}, Age: ${age}`);

        const hobbies = ['Reading', 'Traveling'];
        print(`User Hobbies: ${[...hobbies, 'Coding'].join(', ')}`);
    } catch (error) {
        console.error(`Error fetching user data: ${error}`);
    }
};

logUserDetails(1);
