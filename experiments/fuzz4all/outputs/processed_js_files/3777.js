const fetchUserData = async (userId) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userData = {
                id: userId,
                name: 'John Doe',
                preferences: {
                    theme: 'dark',
                    language: 'en'
                }
            };
            resolve(userData);
        }, 1000);
    });
};

const applyPreferences = ({ preferences: { theme, language } }) => {
    print(`Applying theme: ${theme}`);
    print(`Setting language: ${language}`);
    return Promise.resolve('Preferences applied');
};

const notifyUser = (message) => {
    print(`Notification: ${message}`);
};

 
const main = async (userId) => {
    try {
        const user = await fetchUserData(userId);
        const [applyResult] = await Promise.all([
            applyPreferences(user)
        ]);
        notifyUser(applyResult);
    } catch (error) {
        console.error('Error:', error);
    }
};

 
(async () => {
    await main(1);
})();
