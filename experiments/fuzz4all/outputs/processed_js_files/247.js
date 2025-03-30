const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processUserData = (users) => {
  return users
    .filter(user => user.active)
    .map(({ id, name, email, address: { city } }) => ({
      id,
      name,
      email,
      city
    }));
};

const main = async () => {
  try {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const activeUsers = processUserData(users);

    const displayUsers = activeUsers.map(({ id, name, email, city }) =>
      `ID: ${id}, Name: ${name}, Email: ${email}, City: ${city}`
    );

    displayUsers.forEach(user => print(user));

     
    const handler = {
      get: (obj, prop) => {
        print(`Accessing property ${prop}`);
        return obj[prop];
      }
    };

    const proxyUsers = new Proxy(activeUsers[0], handler);
    print(proxyUsers.name);   
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
