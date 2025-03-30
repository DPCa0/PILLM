 

 
const apiModule = (() => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const fetchUserData = async (id) => {
    await delay(1000);  
    return { id, name: 'John Doe', age: 30, city: 'New York' };
  };

  return { fetchUserData };
})();

 
(async () => {
  const { fetchUserData } = apiModule;

  const processUserData = ({ name, age, ...rest }) => {
    print(`User Info: Name - ${name}, Age - ${age}`);
    print(`Additional Info:`, rest);
  };

  try {
    const userId = 1;
    print('Fetching user data...');

    const userData = await fetchUserData(userId);
    print('Data fetched successfully.');

    processUserData(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
