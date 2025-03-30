(async () => {
   
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

   
  const handler = {
    get: (target, property) => {
      if (property in target) {
        print(`Getting ${property}: ${target[property]}`);
        return target[property];
      } else {
        print(`Property ${property} not found`);
        return undefined;
      }
    },
    set: (target, property, value) => {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const dataObject = new Proxy({}, handler);

   
  const processData = ({ title, ...rest }) => {
    print(`Title: ${title}`);
    print('Other data:', rest);
  };

   
  const URL = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const data = await fetchData(URL);
    Object.assign(dataObject, data);  
    processData(dataObject);  
  } catch (error) {
    print('An error occurred:', error);
  }
})();
