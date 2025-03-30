const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

const processUserData = ({ name, email, address: { city } }) => {
  return `Name: ${name}, Email: ${email}, City: ${city}`;
};

const logUserData = async (userId) => {
  const userData = await fetchUserData(userId);
  if (userData) {
    const processedData = processUserData(userData);
    print(processedData);
  }
};

const handleMultipleUsers = async (userIds) => {
  try {
    await Promise.all(userIds.map(async userId => {
      await logUserData(userId);
    }));
  } catch (error) {
    console.error('Error handling multiple users:', error);
  }
};

 
const originalFetch = window.fetch;
window.fetch = new Proxy(originalFetch, {
  apply(target, thisArg, args) {
    print(`Fetch called with args: ${args}`);
    return Reflect.apply(target, thisArg, args);
  }
});

 
const userInfo = {
  userId: 1,
  preferences: {
    theme: 'dark',
  },
};

const theme = userInfo.preferences?.theme ?? 'light';
print(`User theme is: ${theme}`);

 
handleMultipleUsers([1, 2, 3]);
