 
 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Data fetch failed');
  }
};

const processUsers = async () => {
  const users = await fetchData('https://jsonplaceholder.typicode.com/users');

   
  const formattedUsers = users.map(({ id, name, email, address: { city } }) => ({
    id,
    name,
    email,
    city,
  }));

   
  const newUser = {
    id: formattedUsers.length + 1,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    city: 'New City',
  };

  return [...formattedUsers, newUser];
};

const displayUsers = async () => {
  try {
    const users = await processUsers();
    
     
    users.forEach(({ id, name, email, city }) => {
      print(`User ID: ${id}\nName: ${name}\nEmail: ${email}\nCity: ${city}\n---`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

 
displayUsers();
