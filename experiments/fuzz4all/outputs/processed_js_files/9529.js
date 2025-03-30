const fetchUserData = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: 'John Doe', age: 30 });
    }, 1000);
  });
};

const processUserData = async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    const enrichedData = { ...userData, timestamp: new Date().toISOString() };

    const displayData = ({ id, name, age, timestamp }) =>
      `User Data: ID-${id}, Name-${name}, Age-${age}, Retrieved At-${timestamp}`;

    print(displayData(enrichedData));
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

processUserData(1);

 
 
 
 
 
 
