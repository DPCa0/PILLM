const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const processData = async () => {
  const users = [1, 2, 3];
  try {
    const userPromises = users.map(userId => fetchUserData(userId));
    const userData = await Promise.all(userPromises);

    const transformedData = userData.reduce((acc, user) => {
      const { id, name, address: { city } } = user;
      acc.push({ id, name, city });
      return acc;
    }, []);

    const filteredData = transformedData.filter(({ city }) => city.startsWith('S'));
    print(filteredData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();
