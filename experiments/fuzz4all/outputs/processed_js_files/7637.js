 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  try {
    const data = {
      user: 'Alice',
      email: 'alice@example.com',
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          sms: false
        }
      }
    };

     
    const {
      user,
      preferences: { theme, ...restPreferences }
    } = data;

     
    const newData = {
      ...data,
      preferences: {
        ...restPreferences,
        theme: 'light'
      }
    };

     
    print(`User: ${user}, Theme: ${theme}`);

     
    await delay(2000);

    print('Updated Data:', newData);

     
    const nums = [1, 2, 3, 4, 5];
    const sum = nums.reduce((acc, val) => acc + val, 0);

    print('Sum of array elements:', sum);

     
    const handler = {
      get(target, prop) {
        if (prop in target) {
          print(`Accessing property '${prop}'`);
          return target[prop];
        }
        return 'Property not found!';
      }
    };

    const proxyData = new Proxy(data, handler);

    print(proxyData.user);
    print(proxyData.nonExistentProp);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
