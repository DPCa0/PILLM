 
 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
};

const processData = async () => {
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/users');

   
  const [{ name, email, ...rest }] = apiData;

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      } else {
        return `Property ${prop} does not exist on target object`;
      }
    },
    set: (target, prop, value) => {
      print(`Setting value ${value} to property ${prop}`);
      target[prop] = value;
      return true;
    }
  };

  const userProxy = new Proxy({ name, email, ...rest }, handler);

   
  const output = `
    User Name: ${userProxy.name}
    User Email: ${userProxy.email}
  `;
  
  print(output);

   
  userProxy.location = "Earth";
  print(userProxy.location);  
  print(userProxy.nonexistent);  
};

processData();
