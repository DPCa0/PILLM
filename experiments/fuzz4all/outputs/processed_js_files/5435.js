 
(async function complexJavaScriptFeatures() {
   
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: 'Alice', age: 30 },
          settings: { theme: 'dark', notifications: true }
        });
      }, 1000);
    });
  };

  try {
    const { user, settings } = await fetchData();  
    print(`Fetched user: ${user.name}, Age: ${user.age}`);
    
     
    const userTheme = settings?.theme ?? 'default';
    print(`User theme: ${userTheme}`);

     
    const handler = {
      get(target, prop, receiver) {
        print(`Property "${prop}" accessed.`);
        return Reflect.get(target, prop, receiver);
      }
    };

    const proxiedUser = new Proxy(user, handler);
    print(`Proxied user name: ${proxiedUser.name}`);  

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
