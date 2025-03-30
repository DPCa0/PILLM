const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch user data failed:', error);
    throw error;
  }
};

const processUserData = ({ name, email, address: { city } }) => {
  return {
    username: name.toUpperCase(),
    emailDomain: email.split('@')[1],
    location: city
  };
};

const displayUserData = (userData) => {
  console.table(userData);
};

const execute = async () => {
  const userIds = [1, 2, 3, 4, 5];
  const userPromises = userIds.map(id => fetchUserData(id).then(processUserData));
  try {
    const allUserData = await Promise.all(userPromises);
    displayUserData(allUserData);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

execute();
