 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Property '${prop}' accessed.`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Property '${prop}' set to '${value}'.`);
      obj[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);

   
  const titles = [...new Map(data.map(item => [item.id, item.title]))].map(([id, title]) => ({ id, title }));

   
  const loggingTitles = createLoggingProxy(titles);

   
  loggingTitles[0] = { id: 1, title: "Modified Title" };
  print(loggingTitles[0]);

   
  print(`Fetched and processed ${titles.length} items:`);
  titles.forEach(({ id, title }) => print(`ID: ${id} - Title: ${title}`));
})();
