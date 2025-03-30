 
const fetchUserData = async (userId) => {
   
  const userPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: { city: 'New York', zip: '10001' }
      });
    }, 1000);
  });

  const { name, email, address: { city } } = await userPromise;

  const userMap = new Map();
  userMap.set('Name', name);
  userMap.set('Email', email);
  userMap.set('City', city);

  userMap.forEach((value, key) => {
    print(`${key}: ${value}`);
  });
};

 
(async () => {
  try {
    await fetchUserData(1);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
