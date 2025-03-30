 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const userHandler = {
  get: (target, property) => {
    return property in target ? target[property] : `No such property: ${property}`;
  },
  set: (target, property, value) => {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[property] = value;
    return true;
  }
};

 
const logUserData = (user) => {
  print(`Name: ${user.name}, Age: ${user.age}`);
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  const userData = await fetchData(url);

   
  const user = new Proxy(userData ?? { name: 'Anonymous', age: 0 }, userHandler);

   
  const { name, age } = user;
  print(`Fetched User: ${name ?? 'Unknown'}, Age: ${age ?? 'Unknown'}`);

   
  try {
    user.age = 30;
  } catch (error) {
    console.error(error.message);
  }

  logUserData(user);
})();
