 

const fetchUserData = async (id) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: 'John Doe',
                email: 'john.doe@example.com',
                preferences: {
                    theme: 'dark',
                    notifications: true,
                },
                friends: [
                    { name: 'Jane Smith', id: 2 },
                    { name: 'Bob Brown', id: 3 },
                ],
            });
        }, 1000);
    });
};

const modifyUserData = async (userId) => {
     
    const userData = await fetchUserData(userId);

     
    const {
        name: userName,
        email: userEmail,
        preferences: { theme: userTheme },
        friends,
    } = userData;

     
    const newFriend = { name: 'Alice Green', id: 4 };
    const updatedFriends = [...friends, newFriend];

     
    const modifiedUserData = {
        ...userData,
        name: `${userName} Jr.`,
        email: userEmail.replace('@example.com', '@newdomain.com'),
        preferences: {
            ...userData.preferences,
            theme: userTheme === 'dark' ? 'light' : 'dark',
        },
        friends: updatedFriends,
    };

    return modifiedUserData;
};

const main = async () => {
    try {
        const userId = 1;
        const updatedUser = await modifyUserData(userId);
        print('Modified User Data:', updatedUser);
    } catch (error) {
        console.error('Error fetching or modifying user data:', error);
    }
};

main();
