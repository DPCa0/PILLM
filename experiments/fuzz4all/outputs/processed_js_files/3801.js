 

 
const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            name: 'Alice',
            age: 30,
            email: 'alice@example.com',
            preferences: {
                theme: 'dark',
                language: 'en'
            }
        });
    }, 1000);
});

 
const fetchAdditionalPreferences = (email) => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            notifications: true,
            autoSave: false
        });
    }, 1000);
});

 
const getUserProfile = async () => {
    try {
        const userData = await fetchUserData();
        const { email, preferences, ...basicInfo } = userData;
        const additionalPrefs = await fetchAdditionalPreferences(email);
        const userProfile = {
            ...basicInfo,
            preferences: { ...preferences, ...additionalPrefs }
        };
        print(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

 
getUserProfile();
