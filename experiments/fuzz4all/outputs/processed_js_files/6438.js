 
 

const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';

 
const fetchUserData = async () => {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const processedData = data.map(({ id, name, email }) => ({ id, name, email }));
    
     
    processedData.forEach(({ id, name, email }) =>
      console.log(`User ID: ${id}, Name: ${name}, Email: ${email}`)
    );
  } catch (error) {
    console.error(`Failed to fetch user data: ${error}`);
  }
};

 
(async () => await fetchUserData())();

 
const logAccess = (user) => {
  return new Proxy(user, {
    get(target, prop) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    },
  });
};

 
const user = logAccess({ id: 1, name: 'Alice', email: 'alice@example.com' });
print(user.name);
print(user.email);
