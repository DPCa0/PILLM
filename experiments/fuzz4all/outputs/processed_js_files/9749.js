 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ user: { id: 1, name: "Alice", preferences: { theme: "dark", notifications: true } } });
  }, 1000);
});

 
const getUserPreferences = async () => {
  try {
    const { user: { name, preferences } } = await fetchData();
    return { name, ...preferences };
  } catch (error) {
    throw new Error('Failed to retrieve user preferences');
  }
};

 
const preferencesHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing ${prop}: ${target[prop]}`);
      return target[prop];
    }
    console.warn(`Property ${prop} not found, returning default`);
    return 'default';
  }
};

 
(async () => {
  try {
    const preferences = await getUserPreferences();
    const proxiedPreferences = new Proxy(preferences, preferencesHandler);
    
    print(`Welcome, ${proxiedPreferences.name}!`);
    print(`Theme: ${proxiedPreferences.theme}`);
    print(`Notifications: ${proxiedPreferences.notifications}`);
    print(`Non-existing property: ${proxiedPreferences.nonExisting}`);
  } catch (error) {
    console.error(error.message);
  }
})();
