 

const fetchUserData = async () => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'John Doe',
                age: 30,
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    country: 'USA'
                },
                preferences: {
                    theme: 'dark',
                    notifications: true
                }
            });
        }, 1000);
    });
};

const processUserData = async () => {
    try {
        const userData = await fetchUserData();
        const { name, age, address: { city }, preferences: { theme } } = userData;
        
        print(`Name: ${name}, Age: ${age}`);
        print(`City: ${city}`);
        print(`Preferred Theme: ${theme}`);
        
         
        const { sendNotification } = await import('./notifications.js');
        if (userData.preferences.notifications) {
            sendNotification(`Welcome back, ${name}!`);
        }
        
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

processUserData();

**`notifications.js`**:
 
export const sendNotification = (message) => {
    print(`Notification: ${message}`);
};
