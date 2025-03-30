 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processUserData = ({ name, age }) => `User: ${name}, Age: ${age}`;

const userProxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property "${prop}" not found!`);
    }
  }
};

const main = async () => {
  try {
    const userData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const processedData = processUserData(userData);
    print(processedData);

    const user = new Proxy(userData, userProxyHandler);
    print(user.name);  
    print(user.nonExistentProp);  
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
