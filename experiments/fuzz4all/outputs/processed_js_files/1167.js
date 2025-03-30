 
const fetchUserData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;  
      success ? resolve({ id: 1, name: 'Alice' }) : reject('Failed to fetch user data');
    }, 1000);
  });

 
async function processUserData() {
  try {
    const user = await fetchUserData();
    print('User data fetched successfully:', user);
     
    const { id: userId, name: userName } = user;
    print(`Processing user: ${userName} (ID: ${userId})`);

     
    const message = `Hello, ${userName}! Welcome to our platform.`;
    print(message);

     
    Array.from(message).forEach((char) => print(char));
  } catch (error) {
    console.error('Error:', error);
  }
}

 
const defaultConfig = { theme: 'light', language: 'en' };
const userConfig = null;
const finalConfig = {
  theme: userConfig?.theme ?? defaultConfig.theme,
  language: userConfig?.language ?? defaultConfig.language,
};

print('Final Configuration:', finalConfig);

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
};

const userProxy = new Proxy({ name: 'Bob', age: 25 }, handler);

print(userProxy.name);  

 
processUserData();
