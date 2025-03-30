 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { name: 'John Doe', age: 30 },
        settings: { theme: 'dark', notifications: true }
      });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const { user, settings } = await fetchData();

     
    const updatedUser = { ...user, active: true };

    print(`User Name: ${updatedUser.name}`);
    print(`User Age: ${updatedUser.age}`);
    print(`Active User: ${updatedUser.active}`);
    print(`Theme: ${settings.theme}`);
    print(`Notifications Enabled: ${settings.notifications}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  await processUserData();
})();
