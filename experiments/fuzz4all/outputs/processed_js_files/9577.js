 
const fetchData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

     
    const users = await response.json();
    const processedUsers = users.map(({ id, name, email, address: { city } }) => ({
      id,
      name,
      email,
      city,
    }));

     
    const usersById = processedUsers.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    print(usersById);

     
    const uniqueCities = [...new Set(processedUsers.map(user => user.city))];
    print('Unique cities:', uniqueCities);

     
    const capitalizeNamePromises = processedUsers.map(user =>
      Promise.resolve(user.name.toUpperCase())
    );
    const capitalizedNames = await Promise.all(capitalizeNamePromises);

    print('Capitalized Names:', capitalizedNames);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
