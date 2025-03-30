 
async function fetchAndProcessUsers(apiUrl) {
  try {
     
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const users = await response.json();

     
    const processedUsers = users
      .filter(({ isActive }) => isActive)  
      .map(({ id, name, email }) => ({  
        userId: id,
        displayName: name.toUpperCase(),  
        contact: email
      }))
      .reduce((acc, user) => {  
        acc[user.userId] = user;
        return acc;
      }, {});

    print('Processed Users:', processedUsers);

  } catch (error) {
    console.error('Error fetching or processing users:', error);
  }
}

 
fetchAndProcessUsers('https://jsonplaceholder.typicode.com/users');

 
const userSettings = {
  theme: 'dark',
  notifications: true
};

const settingsHandler = {
  set(target, property, value) {
    print(`Setting changed: ${property} = ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedSettings = new Proxy(userSettings, settingsHandler);

 
proxiedSettings.theme = 'light';
proxiedSettings.notifications = false;
