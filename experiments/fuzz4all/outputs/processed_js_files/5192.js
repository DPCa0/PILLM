const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

const processData = (data) => {
  const processed = data
    .filter(({ isActive }) => isActive)
    .map(({ id, name, tags }) => ({ id, name, tags: new Set(tags) }))
    .reduce((acc, { id, name, tags }) => {
      acc[id] = { name, tags };
      return acc;
    }, {});
  
  return processed;
};

const execute = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processedData = processData(data);
    print(processedData);

     
    const handler = {
      set: function (obj, prop, value) {
        print(`Property ${prop} set to ${value}`);
        obj[prop] = value;
        return true;
      },
    };
    const proxiedData = new Proxy(processedData, handler);

     
    proxiedData[1] = { name: 'Changed Name', tags: new Set(['javascript']) };
  } catch (error) {
    console.error(error);
  }
};

execute();
