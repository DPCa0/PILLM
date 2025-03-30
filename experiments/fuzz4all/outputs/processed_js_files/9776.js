 

 
const fetchUserData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.2;  
        if(success) {
            resolve({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                preferences: {
                    theme: 'dark',
                    language: 'en'
                }
            });
        } else {
            reject('Failed to fetch user data');
        }
    }, 1000);
});

 
const getUserProfile = async () => {
    try {
        const user = await fetchUserData();

         
        const { name, email, preferences: { theme, language } } = user;

         
        const updatedUser = { 
            ...user,
            preferences: {
                ...user.preferences,
                theme: 'light'  
            }
        };

        console.log(`User Info:
        Name: ${name}
        Email: ${email}
        Theme: ${theme}
        Language: ${language}`);

        print('Updated User:', updatedUser);
    } catch (error) {
        console.error('Error:', error);
    }
};

 
(async () => {
    await getUserProfile();
})();
