 
const fetchUserData = (userId) => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            id: userId,
            name: `User${userId}`,
            email: `user${userId}@example.com`
        });
    }, Math.random() * 1000);  
});

 
const getUserData = async (userIds) => {
    const userPromises = userIds.map(id => fetchUserData(id));
    
    try {
         
        const results = await Promise.allSettled(userPromises);
        const users = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        
        print('Fetched Users:', users);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
const displayUserEmails = ({ users, filter = () => true }) => {
    for (const { email } of users.filter(filter)) {
        print(`User Email: ${email}`);
    }
};

 
(async () => {
     
    await getUserData([1, 2, 3, 4, 5]);

    const users = [
        { id: 1, name: "User1", email: "user1@example.com" },
        { id: 2, name: "User2", email: "user2@example.com" },
        { id: 3, name: "User3", email: "user3@example.com" },
        { id: 4, name: "User4", email: "user4@example.com" },
        { id: 5, name: "User5", email: "user5@example.com" }
    ];
    
     
    print(`Displaying emails for users: ${users.map(u => u.name).join(', ')}`);

     
    displayUserEmails({
        users,
        filter: ({ id }) => id % 2 !==