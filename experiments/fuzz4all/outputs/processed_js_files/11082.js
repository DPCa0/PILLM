 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { name: 'Alice', age: 28 },
                settings: { theme: 'dark', notifications: true }
            });
        }, 1000);
    });
}

 
async function handleData() {
    const { user: { name, age }, settings: { theme, notifications } } = await fetchData();

    print(`User: ${name}, Age: ${age}`);
    print(`Theme: ${theme}, Notifications: ${notifications}`);

     
    if (notifications) {
        const { sendNotification } = await import('./notificationModule.js');
        sendNotification(`${name}, you have a new message!`);
    }
}

handleData().catch(console.error);

 
 
 
 
