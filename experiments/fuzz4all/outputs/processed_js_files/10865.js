 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processUserData = ({ name, email, address: { city } }) => {
  print(`User: ${name}`);
  print(`Email: ${email}`);
  print(`City: ${city}`);
};

const errorHandler = (handler) => {
  return {
    apply: (target, thisArg, args) => {
      try {
        return Reflect.apply(...arguments);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
  };
};

const apiCall = new Proxy(fetchData, errorHandler());

const main = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    const userData = await apiCall(url);
    processUserData(userData);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

main();
