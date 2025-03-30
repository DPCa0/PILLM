 

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const processUserData = ({ id, name, email }) => {
  return `${name} (ID: ${id}) can be contacted via email: ${email}`;
};

const userHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property ${property}`);
      return target[property];
    } else {
      return `Property ${property} does not exist`;
    }
  },
};

const displayUserData = async () => {
  try {
    const user = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const processedUser = processUserData(user);
    print(processedUser);

    const proxiedUser = new Proxy(user, userHandler);
    print(proxiedUser.name);
    print(proxiedUser.nonExistentProperty);  
  } catch (error) {
    console.error('Error fetching or processing user data:', error);
  }
};

displayUserData();
