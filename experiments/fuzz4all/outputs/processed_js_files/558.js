 

const createDataHandler = () => {
  const handler = {
    get(target, prop) {
      if (prop in target) {
        print(`Getting property ${prop}`);
        return target[prop];
      } else {
        console.warn(`Property ${prop} does not exist`);
        return undefined;
      }
    },
    set(target, prop, value) {
      if (prop in target) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
      } else {
        console.warn(`Property ${prop} does not exist`);
        return false;
      }
    },
  };
  return handler;
};

const data = {
  id: 1,
  name: 'Data Item',
  description: 'A complex data item',
};

const proxiedData = new Proxy(data, createDataHandler());

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    proxiedData.description = data.title || 'No description available';
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
};

(async () => {
  await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print(proxiedData.description);
})();
