 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'valid') {
                resolve({ data: { user: 'Alice', age: 30, email: 'alice@example.com' } });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

 
const fetchAdditionalData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ preferences: { theme: 'dark', notifications: true } });
        }, 500);
    });
};

 
async function processData(url) {
    try {
        const [userResponse, additionalData] = await Promise.all([fetchData(url), fetchAdditionalData()]);

         
        const { data: { user, age, email } } = userResponse;
        const { preferences: { theme, notifications } } = additionalData;

         
        console.log(`
            User Information:
            Name: ${user}
            Age: ${age}
            Email: ${email}

            Preferences:
            Theme: ${theme}
            Notifications Enabled: ${notifications}
        `);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
processData('valid');
