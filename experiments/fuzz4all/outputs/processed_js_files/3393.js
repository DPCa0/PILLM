 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

 
const createWatchedObject = (obj) => {
  return new Proxy(obj, {
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  });
};

 
const processData = (data) => {
   
  const mappedData = data.map(({ id, name }) => ({ id, name: name.toUpperCase() }));
   
  return mappedData.filter(({ name }) => name.includes("A"));
};

 
const fetchAndProcessData = async () => {
  const watchedObject = createWatchedObject({ name: "Initial" });

  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2'
  ];

  for await (const url of urls) {
    const data = await fetchData(url);
    const processedData = processData([data]);

    processedData.forEach(({ name }) => {
      watchedObject.name = name;
    });
  }
};

 
fetchAndProcessData();
